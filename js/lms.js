/* KK Learning: static-first learner workspace, with optional Firebase identity and sync. */
(() => {
  'use strict';
  const courses = window.KK_COURSES;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let user = null, db = null, firebase = null, cloudReady = false;
  let view = 'overview', category = 'all', query = '', currentCourse = null, currentLesson = 0;
  let toastTimer, saveTimer, syncQueue = Promise.resolve(), authGeneration = 0;
  let ytPlayer = null, watchTimer = null, watchCursor = 0, watchReady = false, watchMountId = 0;
  const watchedLessons = new Set();
  const quizOpenedForWatch = new Set();
  let state = readLocal();
  function watchKey(courseId, lessonId) { return `${courseId}:${lessonId}`; }
  function isLessonWatched(courseId, lessonId) { return watchedLessons.has(watchKey(courseId, lessonId)); }
  function markLessonWatched(courseId, lessonId) { watchedLessons.add(watchKey(courseId, lessonId)); }
  function parseYouTube(url) {
    try {
      const parsed = new URL(url);
      const list = parsed.searchParams.get('list');
      const parts = parsed.pathname.split('/').filter(Boolean);
      const videoId = parts[0] === 'embed' && parts[1] && parts[1] !== 'videoseries' ? parts[1] : null;
      return videoId || list ? {videoId, list} : null;
    } catch { return null; }
  }
  function loadYouTubeAPI() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    return new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        try { previous?.(); } catch {}
        resolve(window.YT);
      };
      if (!document.querySelector('script[data-kk-youtube-api]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.dataset.kkYoutubeApi = '1';
        script.onerror = () => reject(new Error('youtube-api-failed'));
        document.head.appendChild(script);
      }
    });
  }
  function destroyStrictPlayer() {
    clearInterval(watchTimer);
    watchTimer = null;
    watchReady = false;
    watchCursor = 0;
    if (ytPlayer) {
      try { ytPlayer.destroy(); } catch {}
      ytPlayer = null;
    }
  }
  function updateCompleteButton() {
    const button = $('#complete-lesson');
    const hint = $('#video-watch-hint');
    if (!button || !currentCourse) return;
    const lesson = currentCourse.lessons[currentLesson];
    const done = record(currentCourse)?.completed.includes(lesson.id);
    if (!lesson.video || done) {
      button.hidden = false;
      button.disabled = false;
      button.classList.add('primary');
      button.classList.remove('subtle');
      button.textContent = done ? '✓ Completed · undo' : 'Mark lesson complete ✓';
      if (hint) hint.hidden = true;
      return;
    }
    const watched = isLessonWatched(currentCourse.id, lesson.id);
    button.hidden = !watched;
    button.disabled = !watched;
    if (watched) {
      button.classList.add('primary');
      button.classList.remove('subtle');
      button.textContent = 'Mark lesson complete ✓';
    }
    if (hint) {
      hint.hidden = watched;
      hint.textContent = 'Finish watching the full video. Skipping ahead and speed changes are locked; rewinding is allowed.';
    }
  }
  function renderQuizDialog() {
    const c = currentCourse;
    if (!c) return;
    const item = record(c);
    const passed = item?.quizPassed === true;
    $('#quiz-dialog-content').innerHTML = `
      <h2 id="quiz-dialog-title">${escape(c.title)}</h2>
      <p class="quiz-dialog-lead">${passed ? 'You passed this knowledge check. Revisit it anytime.' : `Answer all ${c.quiz.length} questions. You need at least ${QUIZ_PASS_SCORE} correct to pass.`}</p>
      <p class="notes-hint">${escape(quizPassLabel(c.quiz))}</p>
      <form id="quiz-form" class="quiz">
        ${c.quiz.map((q,i) => `<fieldset><legend>${i+1}. ${escape(q.question)}</legend>${q.options.map((o,j) => `<label><input type="radio" name="q${i}" value="${j}" required>${escape(o)}</label>`).join('')}</fieldset>`).join('')}
        <button class="button primary" type="submit">Check my answers →</button>
        <div id="quiz-result" class="quiz-result" role="status" hidden></div>
      </form>`;
  }
  function openQuizDialog() {
    if (!currentCourse || !record(currentCourse)) return;
    renderQuizDialog();
    const dialog = $('#quiz-dialog');
    if (!dialog.open) dialog.showModal();
  }
  function onVideoFinished(courseId, lessonId) {
    if (!currentCourse || currentCourse.id !== courseId) return;
    const key = watchKey(courseId, lessonId);
    const firstFinish = !isLessonWatched(courseId, lessonId);
    markLessonWatched(courseId, lessonId);
    updateCompleteButton();
    if (!firstFinish) return;
    notify('Video finished. Mark lesson complete is ready.');
    if (!record(currentCourse)?.quizPassed && !quizOpenedForWatch.has(key)) {
      quizOpenedForWatch.add(key);
      openQuizDialog();
    }
  }
  function enforceStrictPlayback() {
    if (!ytPlayer || typeof ytPlayer.getCurrentTime !== 'function') return;
    try {
      if (typeof ytPlayer.getPlaybackRate === 'function' && ytPlayer.getPlaybackRate() !== 1) {
        ytPlayer.setPlaybackRate(1);
        notify('Playback speed is locked at normal (1×).');
      }
      const time = ytPlayer.getCurrentTime() || 0;
      const jump = 1.2;
      // Rewind is allowed; only block skipping ahead of the furthest watched point.
      if (time > watchCursor + jump) {
        ytPlayer.seekTo(watchCursor, true);
        notify('Skipping ahead is disabled. You can move back, but finish the video in order.');
        return;
      }
      if (ytPlayer.getPlayerState?.() === window.YT?.PlayerState?.PLAYING) {
        watchCursor = Math.max(watchCursor, time);
      }
      const duration = ytPlayer.getDuration?.() || 0;
      if (duration > 0 && watchCursor >= duration - 1.5) {
        onVideoFinished(currentCourse.id, currentCourse.lessons[currentLesson].id);
      }
    } catch {}
  }
  async function mountStrictPlayer(url, courseId, lessonId) {
    destroyStrictPlayer();
    const host = $('#kk-strict-player');
    if (!host) return;
    const media = parseYouTube(url);
    if (!media) {
      host.outerHTML = `<div class="video-frame"><iframe src="${escape(url)}" title="Lesson video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
      return;
    }
    const mountId = ++watchMountId;
    watchCursor = 0;
    try {
      const YT = await loadYouTubeAPI();
      if (mountId !== watchMountId || !$('#kk-strict-player')) return;
      const playerVars = {
        controls: 1,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        playsinline: 1,
        iv_load_policy: 3,
        origin: location.origin
      };
      if (media.list) {
        playerVars.listType = 'playlist';
        playerVars.list = media.list;
      }
      ytPlayer = new YT.Player(host, {
        width: '100%',
        height: '100%',
        videoId: media.videoId || undefined,
        playerVars,
        events: {
          onReady() {
            if (mountId !== watchMountId) return;
            watchReady = true;
            try { ytPlayer.setPlaybackRate(1); } catch {}
            watchTimer = setInterval(enforceStrictPlayback, 250);
            updateCompleteButton();
          },
          onStateChange(event) {
            if (mountId !== watchMountId) return;
            if (event.data === YT.PlayerState.ENDED) onVideoFinished(courseId, lessonId);
          },
          onPlaybackRateChange() {
            if (mountId !== watchMountId) return;
            try {
              if (ytPlayer.getPlaybackRate() !== 1) {
                ytPlayer.setPlaybackRate(1);
                notify('Playback speed is locked at normal (1×).');
              }
            } catch {}
          }
        }
      });
    } catch {
      if (mountId === watchMountId) {
        notify('Could not load the locked video player. Check your connection and try again.');
      }
    }
  }
  function key() { return `kk-learning-v1:${user ? user.uid : 'guest'}`; }
  function normalize(raw) {
    const clean = { courses: {} };
    for (const course of courses) {
      const item = raw?.courses?.[course.id];
      if (!item || item.enrolled !== true) continue;
      const done = Array.isArray(item.completed) ? [...new Set(item.completed.filter(id => course.lessons.some(l => l.id === id)))] : [];
      const notes = {};
      for (const lesson of course.lessons) if (typeof item.notes?.[lesson.id] === 'string') notes[lesson.id] = item.notes[lesson.id].slice(0, 10000);
      clean.courses[course.id] = {enrolled:true, completed:done, notes, quizPassed:item.quizPassed === true};
    }
    return clean;
  }
  function readLocal() {
    try { return normalize(JSON.parse(localStorage.getItem(key()) || '{}')); }
    catch { return {courses:{}}; }
  }
  function notify(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 5000);
  }
  function writeLocal() {
    try { localStorage.setItem(key(), JSON.stringify(state)); return true; }
    catch { $('#save-status').textContent = 'Storage unavailable'; notify('Your browser could not save progress. Allow site storage to keep your learning.'); return false; }
  }
  function save() {
    const locallySaved = writeLocal();
    if (user && cloudReady) {
      $('#save-status').textContent = 'Saving progress…';
      clearTimeout(saveTimer);
      saveTimer = setTimeout(sync, 650);
    } else if (locallySaved) $('#save-status').textContent = user ? 'Saved locally · sync unavailable' : 'Saved on this device';
  }
  function sync() {
    clearTimeout(saveTimer);
    if (!user || !cloudReady) return Promise.resolve();
    const uid = user.uid, snapshot = JSON.parse(JSON.stringify(state));
    syncQueue = syncQueue.catch(() => {}).then(async () => {
      try {
        await firebase.setDoc(firebase.doc(db, 'learners', uid), {progress:snapshot, updatedAt:firebase.serverTimestamp()});
        if (user?.uid === uid) $('#save-status').textContent = 'Progress synced';
      } catch {
        if (user?.uid === uid) {
          $('#save-status').textContent = 'Saved locally · sync pending';
          notify('Progress is saved on this device. Cloud sync is unavailable; check your connection and Firebase rules.');
        }
      }
    });
    return syncQueue;
  }
  const QUIZ_PASS_SCORE = 3;
  const enrolled = () => courses.filter(c => state.courses[c.id]);
  const record = c => state.courses[c.id];
  const count = c => record(c)?.completed.length || 0;
  const percent = c => Math.round(count(c) / c.lessons.length * 100);
  const finished = c => count(c) === c.lessons.length && record(c)?.quizPassed;
  const quizPassLabel = (quiz) => `${quiz.length} questions · Pass with ${QUIZ_PASS_SCORE}+ correct`;
  function progress(c) { return `<div class="progress-track" role="progressbar" aria-label="${escape(c.title)} lesson progress" aria-valuenow="${percent(c)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent(c)}%"></span></div>`; }
  function render() {
    const active = enrolled(), completed = active.reduce((n,c) => n + count(c), 0), total = active.reduce((n,c) => n + c.lessons.length, 0);
    $('#nav-count').textContent = active.length;
    $('#catalog-count').textContent = `${courses.length} practical learning paths`;
    $('#stat-enrolled').textContent = active.length;
    $('#stat-lessons').textContent = completed;
    $('#stat-progress').textContent = `${total ? Math.round(completed / total * 100) : 0}%`;
    $('#stat-achievements').textContent = active.filter(finished).length;
    $('#milestone-count').textContent = `${completed} lesson${completed === 1 ? '' : 's'} completed`;
    $('#milestone-text').textContent = completed ? 'Keep the momentum. Choose your next lesson and make a little time for your future.' : 'Complete your first lesson. Every journey begins with a little curiosity.';
    $('#hero-action').innerHTML = active.length ? 'Continue learning <span>↗</span>' : 'Find your first course <span>↗</span>';
    const ongoing = active.filter(c => !finished(c));
    $('#continue-cards').innerHTML = ongoing.length ? ongoing.slice(0,2).map(c => `<article class="continue-card"><img src="${c.image}" alt="${escape(c.title)}" loading="lazy"><div class="continue-info"><span class="eyebrow">${escape(c.categoryLabel)}</span><h3>${escape(c.title)}</h3><div class="progress-label"><span>${count(c)} of ${c.lessons.length} lessons</span><span>${percent(c)}%</span></div>${progress(c)}<button class="text-button" data-course="${c.id}">Resume learning →</button></div></article>`).join('') : `<div class="empty-learning"><span class="empty-icon" aria-hidden="true">${active.length ? '✦' : '▤'}</span><div><h3>${active.length ? 'Look how far you’ve come.' : 'A fresh start, full of possibilities.'}</h3><p>${active.length ? 'You’ve completed your enrolled courses. Find another skill to keep growing.' : 'Pick a course below to begin. Your progress and notes will be saved as you learn.'}</p><button class="text-button" data-goto="catalog">Explore your learning paths ↗</button></div></div>`;
    const visible = courses.filter(c => (view !== 'learning' || record(c)) && (category === 'all' || c.category === category) && `${c.title} ${c.description} ${c.categoryLabel}`.toLowerCase().includes(query));
    $('#course-grid').innerHTML = visible.map(c => `<article class="course-card"><div class="course-image"><img src="${c.image}" alt="${escape(c.title)}" loading="lazy"><span class="course-tag">${escape(c.tag)}</span></div><div class="course-card-body"><span class="course-category">${escape(c.categoryLabel)}</span><h3>${escape(c.title)}</h3><p>${escape(c.description)}</p><div class="course-meta"><span>▤ ${c.lessons.length} lessons</span><span>◴ ${escape(c.format || 'Self-paced')}</span></div>${record(c) ? progress(c) : ''}<button class="button wide" data-course="${c.id}">${finished(c) ? 'Revisit course' : record(c) ? `Continue · ${percent(c)}%` : 'Explore course'}<span>↗</span></button></div></article>`).join('');
    $('#no-results').hidden = visible.length !== 0;
    $('#no-results').textContent = view === 'learning' && !active.length ? 'Your learning space is ready. Explore courses and enroll to begin.' : 'No courses found. Try another search or category.';
    $('#resource-grid').innerHTML = courses.map(c => `<article class="resource-card"><span class="resource-icon" aria-hidden="true">${c.resource ? '▧' : '▤'}</span><h3>${escape(c.title)}</h3><p>${c.resource ? 'Revisit the training handbook alongside your lessons. PDF opens in a new tab; large files may take a moment to load.' : c.format ? 'Explore the curriculum, practical exercises, and official documentation links for this learning path.' : 'Explore the full course overview, prerequisites, and learning resources on the original course page.'}</p><a class="button" href="${encodeURI(c.resource || c.page)}" target="_blank" rel="noopener">${c.resource ? 'Open training handbook ↗' : 'Open course guide ↗'}</a></article>`).join('');
    $('#achievement-grid').innerHTML = courses.map(c => `<article class="achievement-card ${finished(c) ? 'earned' : ''}"><span aria-hidden="true">${finished(c) ? '✦' : '♧'}</span><h3>${escape(c.title)}</h3><p>${finished(c) ? 'Course completed! You finished every lesson and passed the knowledge check.' : `${count(c)} / ${c.lessons.length} lessons completed. Finish the lessons and pass the knowledge check to reach this milestone.`}</p>${progress(c)}<button class="text-button" style="margin-top:15px" data-course="${c.id}">${finished(c) ? 'Review course ↗' : 'Keep growing ↗'}</button></article>`).join('');
  }
  function setView(next) {
    view = next; category = 'all'; query = '';
    $('#course-search').value = '';
    document.querySelectorAll('[data-category]').forEach(b => { b.classList.toggle('active', b.dataset.category === 'all'); b.setAttribute('aria-pressed', String(b.dataset.category === 'all')); });
    const headings = {
      overview:['MAKE ROOM FOR YOUR POTENTIAL', user ? `Welcome back, ${user.displayName?.split(' ')[0] || 'learner'}` : 'Your next chapter starts here', 'Practical skills. Real possibilities. Take the next step, at your own pace.'],
      learning:['KEEP YOUR MOMENTUM', 'A little progress, every day', 'Your courses, your pace. Pick up where you left off.'],
      catalog:['INVEST IN YOURSELF', 'Find your next possibility', 'Explore practical learning paths built around skills you can use.'],
      resources:['YOUR LEARNING TOOLKIT', 'Good learning goes beyond a lesson', 'Keep useful guides and training materials close at hand.'],
      achievements:['CELEBRATE THE SMALL WINS', 'Look how far you can go', 'Every completed lesson is a step toward your next chapter.']
    };
    const heading = headings[next];
    $('#page-eyebrow').textContent = heading[0];
    $('#page-title').textContent = heading[1];
    const dot = document.createElement('span'); dot.textContent = '.'; $('#page-title').append(dot);
    $('#page-description').textContent = heading[2];
    $('#overview-content').hidden = next !== 'overview';
    $('#catalog-section').hidden = !['overview','catalog','learning'].includes(next);
    $('#resources-section').hidden = next !== 'resources';
    $('#achievements-section').hidden = next !== 'achievements';
    $('#courses-heading').textContent = next === 'learning' ? 'Your courses, all in one place' : 'Skills that open doors';
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === next); if (b.dataset.view === next) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    render();
  }
  function openCourse(id) {
    currentCourse = courses.find(c => c.id === id);
    if (!currentCourse) return;
    const first = currentCourse.lessons.findIndex(l => !record(currentCourse)?.completed.includes(l.id));
    currentLesson = first < 0 ? 0 : first;
    renderCourse();
    $('#course-dialog').showModal();
    $('#course-dialog').scrollTop = 0;
  }
  function renderCourse() {
    destroyStrictPlayer();
    const c = currentCourse;
    const lesson = c.lessons[currentLesson];
    const item = record(c);
    const isDone = item?.completed.includes(lesson.id);
    const watched = !lesson.video || isDone || isLessonWatched(c.id, lesson.id);
    let content;
    if (lesson.body) {
      content = `<article class="lesson-reading">
        <p>${escape(lesson.body)}</p>
        <div class="practice-task"><strong>Your practice task</strong><p>${escape(lesson.practice)}</p></div>
        <a class="button" href="${escape(lesson.readingUrl)}" target="_blank" rel="noopener">${escape(lesson.readingLabel)} ↗</a>
      </article>`;
    } else if (item && lesson.video) {
      content = `<div class="video-frame strict-video"><div id="kk-strict-player"></div></div>`;
    } else {
      content = `<article class="course-preview">
        <img src="${escape(c.image)}" alt="${escape(c.title)}" width="720" height="405">
        <div><h4>${item ? 'Study this lesson' : 'Build your skills, one lesson at a time.'}</h4>
        <p>${item ? 'Open the full course guide to study this topic and its learning resources.' : 'Preview the curriculum, then start the course to unlock video lessons, save notes, and track your progress.'}</p></div>
      </article>`;
    }
    $('#course-dialog-content').innerHTML = `
      <header class="dialog-heading">
        <span class="course-category">${escape(c.categoryLabel)} · ${escape(c.format || 'Video lessons')}</span>
        <h2 id="dialog-title">${escape(c.title)}</h2>
        <p>${escape(c.description)} ${c.id === 'electrician' ? 'Practical electrical work requires qualified supervision and compliance with local requirements.' : ''}</p>
        <div class="course-overview-meta"><span>▤ ${c.lessons.length} lessons</span><span>◴ Self-paced</span><span>✓ Knowledge check included</span></div>
        <div class="course-start-bar">
          <div class="course-start-actions">
            ${!item ? '<button class="button primary" id="enroll">Start this course →</button>' : ''}
            <a class="button" href="${escape(c.page)}" target="_blank" rel="noopener">Full course guide ↗</a>
          </div>
          <span class="course-enrollment-status">${item ? `${count(c)} of ${c.lessons.length} lessons completed` : 'Start to save your progress and lesson notes'}</span>
        </div>
      </header>
      <div class="player-layout">
        <section class="lesson-panel" aria-labelledby="active-lesson-title">
          <div class="lesson-heading"><span class="eyebrow">${!item ? 'LESSON PREVIEW' : c.format ? 'READ · PRACTICE · BUILD' : 'WATCH · LEARN · PRACTICE'}</span><span>Lesson ${currentLesson + 1} of ${c.lessons.length}</span></div>
          <h3 class="lesson-title" id="active-lesson-title">${escape(lesson.title)}</h3>
          ${content}
          ${item ? `<div class="lesson-actions"><button class="button primary" id="complete-lesson" ${!isDone && lesson.video && !watched ? 'hidden' : ''}>${isDone ? '✓ Completed · undo' : 'Mark lesson complete ✓'}</button>${currentLesson < c.lessons.length - 1 ? '<button class="button" id="next-lesson">Next lesson →</button>' : '<button class="button" id="go-quiz">Open knowledge check</button>'}</div>
            ${lesson.video && !isDone && !watched ? '<p class="video-watch-hint" id="video-watch-hint">Finish watching the full video. Skipping ahead and speed changes are locked; rewinding is allowed.</p>' : '<p class="video-watch-hint" id="video-watch-hint" hidden></p>'}
            <div class="lesson-notes"><label class="notes-label" for="lesson-notes">Your lesson notes</label><textarea class="notes-input" id="lesson-notes" maxlength="10000" placeholder="Write an idea to remember or a question to revisit…">${escape(item.notes[lesson.id] || '')}</textarea><p class="notes-hint">Saved automatically. ${user && cloudReady ? 'Synced to your account.' : 'Stored in this browser.'}</p></div>` : '<p class="preview-hint">This is a preview. Start the course above when you’re ready to track your learning.</p>'}
        </section>
        <aside class="curriculum-panel" aria-label="Course curriculum">
          <div class="curriculum-header"><h3>Course curriculum</h3><span>${count(c)}/${c.lessons.length}</span></div>
          ${progress(c)}
          <p class="curriculum-hint">Choose a lesson to ${item ? 'continue learning' : 'preview its content'}.</p>
          <div class="lesson-list">${c.lessons.map((l,i) => `<button class="lesson-row ${i === currentLesson ? 'selected' : ''} ${item?.completed.includes(l.id) ? 'done' : ''}" data-lesson="${i}" ${i === currentLesson ? 'aria-current="step"' : ''}><span>${item?.completed.includes(l.id) ? '✓' : i+1}</span><span>${escape(l.title)}</span>${i === currentLesson ? '<span class="lesson-current" aria-hidden="true">→</span>' : ''}</button>`).join('')}</div>
          <p class="notes-hint">${c.format ? 'Guided reading, practical exercises, and official documentation.' : 'Videos from external creators in the existing course curriculum.'}</p>
        </aside>
      </div>`;
    if (item && lesson.video) mountStrictPlayer(lesson.video, c.id, lesson.id);
  }
  document.addEventListener('click', async event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.view || target.dataset.goto) {
      setView(target.dataset.view || target.dataset.goto);
      if (target.dataset.goto) { $('#main').scrollIntoView({behavior:'smooth'}); $('#main').focus({preventScroll:true}); }
    }
    if (target.dataset.category) {
      category = target.dataset.category;
      document.querySelectorAll('[data-category]').forEach(b => { b.classList.toggle('active', b === target); b.setAttribute('aria-pressed',String(b === target)); });
      render();
    }
    if (target.dataset.course) openCourse(target.dataset.course);
    if (target.dataset.close) {
      if (target.dataset.close === 'course-dialog') {
        destroyStrictPlayer();
        if ($('#quiz-dialog').open) $('#quiz-dialog').close();
      }
      $(`#${target.dataset.close}`).close();
    }
    if (target.id === 'hero-action') setView(enrolled().length ? 'learning' : 'catalog');
    if (target.dataset.lesson !== undefined) { currentLesson = Number(target.dataset.lesson); renderCourse(); }
    if (target.id === 'enroll') {
      state.courses[currentCourse.id] = {enrolled:true, completed:[], notes:{}, quizPassed:false};
      save(); render(); renderCourse(); notify('You’re enrolled. Your next chapter starts now.');
    }
    if (target.id === 'complete-lesson') {
      const item = record(currentCourse);
      const lesson = currentCourse.lessons[currentLesson];
      const id = lesson.id;
      if (item.completed.includes(id)) {
        item.completed = item.completed.filter(x => x !== id);
      } else {
        if (lesson.video && !isLessonWatched(currentCourse.id, id)) {
          notify('Finish watching the full video at normal speed before marking this lesson complete.');
          return;
        }
        item.completed.push(id);
      }
      save(); render(); renderCourse();
      if (finished(currentCourse)) notify('Course completed. A milestone worth celebrating!');
    }
    if (target.id === 'next-lesson') { currentLesson++; renderCourse(); }
    if (target.id === 'go-quiz') openQuizDialog();
    if (target.id === 'signin' || target.id === 'auth-retry') {
      if ($('#auth-dialog').open) $('#auth-dialog').close();
      await signIn();
    }
    if (target.id === 'signout') {
      target.disabled = true;
      try { await sync(); await googleAuth.signOut(); notify('You’re signed out. Your account progress is kept separately.'); }
      catch { notify('Sign-out failed. Check your connection and try again.'); }
      finally { target.disabled = false; }
    }
  });
  $('#course-search').addEventListener('input', event => { query = event.target.value.trim().toLowerCase(); render(); });
  document.addEventListener('input', event => {
    if (event.target.id === 'lesson-notes') {
      record(currentCourse).notes[currentCourse.lessons[currentLesson].id] = event.target.value;
      save();
    }
  });
  document.addEventListener('submit', event => {
    if (event.target.id !== 'quiz-form') return;
    event.preventDefault();
    const data = new FormData(event.target), c = currentCourse;
    const score = c.quiz.reduce((n,q,i) => n + (Number(data.get(`q${i}`)) === q.answer ? 1 : 0), 0);
    const passed = score >= QUIZ_PASS_SCORE;
    if (passed) { record(c).quizPassed = true; save(); render(); if ($('#course-dialog').open) renderCourse(); }
    $('#quiz-result').hidden = false;
    $('#quiz-result').innerHTML = `<strong>${score}/${c.quiz.length} correct. ${passed ? `Knowledge check passed (${QUIZ_PASS_SCORE}+ required)!` : `You need at least ${QUIZ_PASS_SCORE} correct to pass. Keep practicing, then try again.`}</strong><br>${c.quiz.map((q,i) => `${Number(data.get(`q${i}`)) === q.answer ? '✓' : '○'} ${escape(q.explanation)}`).join('<br>')}${passed && !finished(c) ? '<br>Complete all lessons to reach the course milestone.' : finished(c) ? '<br>✦ All lessons and the knowledge check completed. Well done!' : ''}`;
    if (passed) notify('Knowledge check passed!');
  });
  const googleAuth = window.KKGoogleAuth.createClient({
    config: window.KK_FIREBASE_CONFIG,
    onUser: handleAuthUser,
    onStatus(status) {
      $('#signin').disabled = status === 'loading';
      $('#signin').setAttribute('aria-busy', String(status === 'loading'));
      $('#signin-label').textContent = status === 'loading' ? 'Connecting to Google…' : 'Sign in with Google';
    }
  });
  function authMessage(message, detail, retry = false) {
    $('#auth-message').textContent = message;
    $('#auth-detail').textContent = detail;
    $('#auth-retry').hidden = !retry;
    if (!$('#auth-dialog').open) $('#auth-dialog').showModal();
  }
  function showAuthError(error) {
    const messages = {
      'auth/popup-closed-by-user': ['The sign-in window was closed.', 'Choose “Try Google sign-in again” when you’re ready.'],
      'auth/popup-blocked': ['Your browser blocked the Google sign-in window.', 'Allow pop-ups for this website, then try again.'],
      'auth/unauthorized-domain': ['This website is not authorized for Google sign-in.', `Add ${location.hostname} to Authentication → Settings → Authorized domains in Firebase Console.`],
      'auth/network-request-failed': ['Couldn’t connect to Google sign-in.', 'Check your internet connection and try again.'],
      'auth/operation-not-allowed': ['Google sign-in is not enabled for this project.', 'Enable Google under Authentication → Sign-in method in Firebase Console.'],
      'auth/configuration-not-found': ['Firebase Authentication has not been set up for this project.', 'Open Authentication in Firebase Console, choose Get started, then enable the Google sign-in provider.'],
      'auth/invalid-api-key': ['The Firebase web configuration is invalid.', 'Copy the Web app configuration from Firebase Console → Project settings into js/firebase-config.js.'],
      'auth/invalid-auth-domain': ['The Firebase authentication domain is invalid.', 'Check authDomain in the Firebase Web app configuration.'],
      'auth/web-storage-unsupported': ['Your browser cannot store the sign-in session.', 'Allow site storage in your browser and try again.'],
      'auth/cancelled-popup-request': ['Another sign-in request is already open.', 'Finish or close the existing Google sign-in window, then try again.'],
      'auth/account-exists-with-different-credential': ['This email already uses another sign-in method.', 'Contact the learning team to restore access to the existing account.']
    };
    const [message, detail] = messages[error.code] || ['Google sign-in could not connect.', 'Check your connection and Firebase Web app configuration, then try again.'];
    authMessage(message, detail, true);
  }
  async function signIn() {
    if (!googleAuth.configured) {
      const missing = window.KKGoogleAuth.missingFields(window.KK_FIREBASE_CONFIG).join(', ');
      authMessage('Google sign-in needs the site’s Firebase connection.', `Missing: ${missing}. Add the public Web app configuration to js/firebase-config.js. Guest learning still works on this device.`);
      return;
    }
    if (!['http:', 'https:'].includes(location.protocol)) {
      authMessage('Open the LMS through a web server to sign in.', 'Run python3 -m http.server 8000 in the project folder, then open http://localhost:8000/lms.html. Google authentication cannot run from a file:// page.');
      return;
    }
    if (!googleAuth.ready) {
      try {
        await googleAuth.prepare();
        // The asynchronous retry may outlive browser user activation. Require a fresh click.
        authMessage('Google sign-in is ready.', 'Choose “Try Google sign-in again” to open the account chooser.', true);
      } catch (error) { showAuthError(error); }
      return;
    }
    const button = $('#signin');
    button.disabled = true;
    button.setAttribute('aria-busy','true');
    $('#signin-label').textContent = 'Opening Google…';
    try { await googleAuth.signIn(); }
    catch (error) { showAuthError(error); }
    finally {
      button.disabled = false;
      button.setAttribute('aria-busy','false');
      $('#signin-label').textContent = 'Sign in with Google';
    }
  }
  async function handleAuthUser(nextUser) {
      // The initial signed-out observer must not close a course preview opened on page load.
      if ((user?.uid || null) === (nextUser?.uid || null)) return;
      const generation = ++authGeneration;
      clearTimeout(saveTimer); cloudReady = false;
      user = nextUser; state = readLocal();
      if ($('#course-dialog').open) $('#course-dialog').close();
      $('#signin').hidden = !!user; $('#signout').hidden = !user;
      $('#side-name').textContent = user?.displayName || (user ? 'Learner' : 'Guest learner');
      $('#side-avatar').textContent = user?.displayName?.charAt(0).toUpperCase() || 'L';
      $('#side-status').textContent = user ? 'Your personal learning space' : 'Your journey starts here';
      $('#save-status').textContent = user ? 'Connecting progress…' : 'Saved on this device';
      setView(view);
      if (!user) return;
      // Keep UI usable during connection. Track local edits to avoid replacing them with a late read.
      const initial = JSON.stringify(state), uid = user.uid;
      try {
        if (!db) {
          const storeSDK = await import('https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js');
          if (generation !== authGeneration) return;
          firebase = storeSDK;
          db = storeSDK.getFirestore(googleAuth.app);
        }
        const snapshot = await firebase.getDoc(firebase.doc(db,'learners',uid));
        if (generation !== authGeneration) return;
        if (snapshot.exists() && JSON.stringify(state) === initial) {
          state = normalize(snapshot.data().progress); writeLocal(); render();
          if ($('#course-dialog').open) renderCourse();
        }
        cloudReady = true;
        if (JSON.stringify(state) !== initial || !snapshot.exists()) await sync();
        else $('#save-status').textContent = 'Progress synced';
      } catch {
        if (generation === authGeneration) {
          $('#save-status').textContent = 'Saved locally · sync unavailable';
          notify('Signed in. Cloud progress is unavailable; changes will stay on this device.');
        }
      }
  }
  $('#course-dialog').addEventListener('close', () => {
    destroyStrictPlayer();
    if ($('#quiz-dialog').open) $('#quiz-dialog').close();
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sync(); });
  window.addEventListener('online', () => { if (cloudReady) sync(); });
  $('#today').textContent = new Intl.DateTimeFormat('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(new Date());
  $('#year').textContent = new Date().getFullYear();
  setView('overview');
  const requestedCourse = new URLSearchParams(location.search).get('course');
  if (courses.some(c => c.id === requestedCourse)) openCourse(requestedCourse);
  if (googleAuth.configured && ['http:', 'https:'].includes(location.protocol)) {
    googleAuth.prepare().catch(() => {
      $('#signin-label').textContent = 'Retry Google sign-in';
      $('#save-status').textContent = 'Saved on this device';
    });
  }
})();
