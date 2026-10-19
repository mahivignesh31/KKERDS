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
  let activeLessonQuizId = null;
  let skulptLoading = null;
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
  function lessonQuizPassed(c, lessonId) {
    return record(c)?.lessonQuizzes?.[lessonId] === true;
  }
  function renderQuizDialog(quiz, title, passed, mode) {
    $('#quiz-dialog-content').innerHTML = `
      <h2 id="quiz-dialog-title">${escape(title)}</h2>
      <p class="quiz-dialog-lead">${passed ? 'You passed this knowledge check. Revisit it anytime.' : `Answer all ${quiz.length} questions. You need at least ${QUIZ_PASS_SCORE} correct to pass before the next lesson unlocks.`}</p>
      <p class="notes-hint">${escape(quizPassLabel(quiz))}</p>
      <form id="quiz-form" class="quiz" data-quiz-mode="${mode}">
        ${quiz.map((q,i) => `<fieldset><legend>${i+1}. ${escape(q.question)}</legend>${q.options.map((o,j) => `<label><input type="radio" name="q${i}" value="${j}" required>${escape(o)}</label>`).join('')}</fieldset>`).join('')}
        <button class="button primary" type="submit">Check my answers →</button>
        <div id="quiz-result" class="quiz-result" role="status" hidden></div>
      </form>`;
  }
  function openCourseQuizDialog() {
    if (!currentCourse || !record(currentCourse)) return;
    activeLessonQuizId = null;
    renderQuizDialog(currentCourse.quiz, currentCourse.title, record(currentCourse).quizPassed === true, 'course');
    const dialog = $('#quiz-dialog');
    if (!dialog.open) dialog.showModal();
  }
  function openLessonQuizDialog(lesson) {
    if (!currentCourse || !lesson?.quiz?.length) return;
    activeLessonQuizId = lesson.id;
    renderQuizDialog(lesson.quiz, `${currentCourse.title} · ${lesson.title}`, lessonQuizPassed(currentCourse, lesson.id), 'lesson');
    const dialog = $('#quiz-dialog');
    if (!dialog.open) dialog.showModal();
  }
  function openQuizDialog() { openCourseQuizDialog(); }
  function onVideoFinished(courseId, lessonId) {
    if (!currentCourse || currentCourse.id !== courseId) return;
    const key = watchKey(courseId, lessonId);
    const firstFinish = !isLessonWatched(courseId, lessonId);
    markLessonWatched(courseId, lessonId);
    updateCompleteButton();
    if (!firstFinish) return;
    notify('Video finished. Mark lesson complete is ready.');
  }
  function loadSkulpt() {
    if (window.Sk?.misceval) return Promise.resolve();
    if (skulptLoading) return skulptLoading;
    skulptLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
      script.onload = () => {
        const std = document.createElement('script');
        std.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
        std.onload = () => resolve();
        std.onerror = () => reject(new Error('skulpt-stdlib'));
        document.head.appendChild(std);
      };
      script.onerror = () => reject(new Error('skulpt'));
      document.head.appendChild(script);
    }).catch(error => { skulptLoading = null; throw error; });
    return skulptLoading;
  }
  async function runPythonLab() {
    const code = $('#python-code')?.value ?? '';
    const output = $('#python-output');
    if (!output) return;
    output.textContent = 'Running…\n';
    try {
      await loadSkulpt();
      output.textContent = '';
      function builtinRead(file) {
        if (window.Sk.builtinFiles?.files?.[file] !== undefined) return window.Sk.builtinFiles.files[file];
        throw new Error(`File not found: '${file}'`);
      }
      window.Sk.configure({
        output: text => { output.textContent += text; },
        read: builtinRead,
        inputfun: promptText => window.prompt(promptText || 'Input:', '') ?? '',
        inputfunTakesPrompt: true
      });
      await window.Sk.misceval.asyncToPromise(() => window.Sk.importMainWithBody('<stdin>', false, code, true));
      if (!output.textContent.trim()) output.textContent = '(Program finished with no printed output)';
    } catch (error) {
      output.textContent = String(error.toString?.() || error);
    }
  }
  function runWebLab() {
    const code = $('#web-code')?.value ?? '';
    const frame = $('#web-preview');
    if (!frame) return;
    frame.srcdoc = code;
  }
  function mountLessonLabs(lesson) {
    if (lesson.lab === 'python') {
      $('#run-python')?.addEventListener('click', runPythonLab);
    }
    if (lesson.lab === 'web') {
      $('#run-web')?.addEventListener('click', runWebLab);
      runWebLab();
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
          onError() {
            if (mountId !== watchMountId) return;
            // Do not block progress if YouTube blocks or removes the video.
            markLessonWatched(courseId, lessonId);
            updateCompleteButton();
            const hint = $('#video-watch-hint');
            if (hint) {
              hint.hidden = false;
              hint.textContent = 'This video could not load. Study the lesson notes below, then mark the lesson complete.';
            }
            notify('Video unavailable. You can still complete this lesson using the reading and practice below.');
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
        markLessonWatched(courseId, lessonId);
        updateCompleteButton();
        notify('Could not load the video player. You can still complete this lesson from the reading below.');
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
      const lessonQuizzes = {};
      for (const lesson of course.lessons) {
        if (item.lessonQuizzes?.[lesson.id] === true || item.lessonQuizzes?.[lesson.id] === 'passed') lessonQuizzes[lesson.id] = true;
      }
      clean.courses[course.id] = {enrolled:true, completed:done, notes, lessonQuizzes, quizPassed:item.quizPassed === true};
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
    } else if (locallySaved) $('#save-status').textContent = user ? 'Saved on this device' : 'Saved on this device';
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
  function isLessonUnlocked(c, index) {
    if (index <= 0) return true;
    const item = record(c);
    if (!item) return false;
    return c.lessons.slice(0, index).every(lesson => {
      if (!item.completed.includes(lesson.id)) return false;
      if (lesson.quiz?.length && item.lessonQuizzes?.[lesson.id] !== true) return false;
      return true;
    });
  }
  function clampToUnlockedLesson() {
    if (!currentCourse || isLessonUnlocked(currentCourse, currentLesson)) return;
    const firstOpen = currentCourse.lessons.findIndex((_, i) => isLessonUnlocked(currentCourse, i) && !record(currentCourse)?.completed.includes(currentCourse.lessons[i].id));
    if (firstOpen >= 0) { currentLesson = firstOpen; return; }
    let lastUnlocked = 0;
    currentCourse.lessons.forEach((_, i) => { if (isLessonUnlocked(currentCourse, i)) lastUnlocked = i; });
    currentLesson = lastUnlocked;
  }
  function progress(c) { return `<div class="progress-track" role="progressbar" aria-label="${escape(c.title)} lesson progress" aria-valuenow="${percent(c)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${percent(c)}%"></span></div>`; }
  function render() {
    const active = enrolled(), completed = active.reduce((n,c) => n + count(c), 0), total = active.reduce((n,c) => n + c.lessons.length, 0);
    $('#nav-count').textContent = active.length;
    $('#catalog-count').textContent = `${courses.length} professional & internship paths`;
    $('#stat-enrolled').textContent = active.length;
    $('#stat-lessons').textContent = completed;
    $('#stat-progress').textContent = `${total ? Math.round(completed / total * 100) : 0}%`;
    $('#stat-achievements').textContent = active.filter(finished).length;
    $('#milestone-count').textContent = `${completed} lesson${completed === 1 ? '' : 's'} completed`;
    $('#milestone-text').textContent = completed ? 'Stay consistent. Open your next lesson and protect a short block of focused time today.' : 'Start with one lesson. Clear progress begins with a single completed module.';
    $('#hero-action').innerHTML = active.length ? 'Continue learning <span aria-hidden="true">↗</span>' : 'Browse courses <span aria-hidden="true">↗</span>';
    const ongoing = active.filter(c => !finished(c));
    $('#continue-cards').innerHTML = ongoing.length ? ongoing.slice(0,2).map(c => `<article class="continue-card"><img src="${c.image}" alt="${escape(c.title)}" loading="lazy"><div class="continue-info"><span class="eyebrow">${escape(c.categoryLabel)}</span><h3>${escape(c.title)}</h3><div class="progress-label"><span>${count(c)} of ${c.lessons.length} lessons</span><span>${percent(c)}%</span></div>${progress(c)}<button class="text-button" data-course="${c.id}">Resume course →</button></div></article>`).join('') : `<div class="empty-learning"><span class="empty-icon" aria-hidden="true">${active.length ? '✦' : '▤'}</span><div><h3>${active.length ? 'All enrolled courses completed.' : 'No active course yet.'}</h3><p>${active.length ? 'Choose another path from the catalog to keep building professional skills.' : 'Browse the catalog, enroll in a course, and your progress will appear here.'}</p><button class="text-button" data-goto="catalog">Open course catalog ↗</button></div></div>`;
    const visible = courses.filter(c => {
      if (view === 'learning' && !record(c)) return false;
      if (category === 'internship') return c.track === 'internship';
      if (category !== 'all' && c.category !== category) return false;
      return `${c.title} ${c.description} ${c.categoryLabel} ${c.careers || ''} ${c.duration || ''}`.toLowerCase().includes(query);
    });
    $('#course-grid').innerHTML = visible.map(c => {
      const hasVideo = c.lessons.some(l => l.video);
      const hasLab = c.lessons.some(l => l.lab);
      const hasLessonQuiz = c.lessons.some(l => l.quiz?.length);
      const chips = [
        c.track === 'internship' ? '<span class="feature-chip">Internship</span>' : '',
        c.demand ? `<span class="feature-chip">${escape(c.demand)}</span>` : '',
        hasVideo ? '<span class="feature-chip">Video</span>' : '',
        hasLab ? '<span class="feature-chip">Practice lab</span>' : '',
        hasLessonQuiz || c.quiz?.length ? '<span class="feature-chip">Quizzes</span>' : '',
        '<span class="feature-chip">Ordered unlock</span>'
      ].filter(Boolean).join('');
      return `<article class="course-card"><div class="course-image"><img src="${c.image}?v=20261019k" alt="${escape(c.title)}" loading="lazy"><span class="course-tag">${escape(c.tag)}</span></div><div class="course-card-body"><span class="course-category">${escape(c.categoryLabel)}</span><h3>${escape(c.title)}</h3><p>${escape(c.description)}</p>${c.careers ? `<p class="course-careers"><strong>Roles:</strong> ${escape(c.careers)}</p>` : ''}<div class="feature-row">${chips}</div><div class="course-meta"><span>▤ ${c.lessons.length} lessons</span><span>◷ ${escape(c.duration || c.format || 'Self-paced')}</span></div>${record(c) ? progress(c) : ''}<button class="button wide" data-course="${c.id}">${finished(c) ? 'Review course' : record(c) ? `Continue · ${percent(c)}%` : 'Open course'}<span aria-hidden="true">↗</span></button></div></article>`;
    }).join('');
    $('#no-results').hidden = visible.length !== 0;
    $('#no-results').textContent = view === 'learning' && !active.length ? 'You have not enrolled in a course yet. Open the catalog to begin.' : 'No courses matched your search. Try another keyword or category.';
    $('#resource-grid').innerHTML = courses.map(c => `<article class="resource-card"><span class="resource-icon" aria-hidden="true">${c.resource ? '▧' : '▤'}</span><h3>${escape(c.title)}</h3><p>${c.resource ? 'Training handbook for this path. Opens in a new tab.' : 'Course guide with curriculum overview and study links.'}</p><a class="button" href="${encodeURI(c.resource || c.page)}" target="_blank" rel="noopener">${c.resource ? 'Open handbook ↗' : 'Open course guide ↗'}</a></article>`).join('');
    $('#achievement-grid').innerHTML = courses.map(c => `<article class="achievement-card ${finished(c) ? 'earned' : ''}"><span aria-hidden="true">${finished(c) ? '✦' : '♧'}</span><h3>${escape(c.title)}</h3><p>${finished(c) ? 'Completed: all lessons and the final knowledge check.' : `${count(c)} / ${c.lessons.length} lessons complete. Finish lessons and pass the final check to earn this milestone.`}</p>${progress(c)}<button class="text-button" style="margin-top:15px" data-course="${c.id}">${finished(c) ? 'Review course ↗' : 'Continue course ↗'}</button></article>`).join('');
  }
  function setView(next) {
    view = next; category = 'all'; query = '';
    $('#course-search').value = '';
    document.querySelectorAll('[data-category], [data-track]').forEach(b => {
      const key = b.dataset.category || b.dataset.track;
      const on = key === 'all';
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const headings = {
      overview:['KK LEARNING', user ? `Welcome back, ${user.displayName?.split(' ')[0] || 'learner'}` : 'Professional skill development', 'Structured video lessons, practice labs, and knowledge checks — at your own pace.'],
      learning:['MY LEARNING', 'Your enrolled courses', 'Resume any path and continue from your last completed lesson.'],
      catalog:['COURSE CATALOG', 'Professional learning paths', 'Technology, data, business, and internship tracks with ordered progress.'],
      resources:['LIBRARY', 'Learning resources', 'Course guides and training handbooks to support your study.'],
      achievements:['MILESTONES', 'Your achievements', 'Track completed courses and celebrate steady professional progress.']
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
    const catalogHeading = $('#catalog-section .section-heading');
    if (catalogHeading) catalogHeading.hidden = next === 'catalog';
    $('#courses-heading').textContent = next === 'learning' ? 'Your enrolled courses' : 'Professional learning paths';
    document.querySelectorAll('[data-view]').forEach(b => { b.classList.toggle('active', b.dataset.view === next); if (b.dataset.view === next) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    render();
  }
  function openCourse(id) {
    currentCourse = courses.find(c => c.id === id);
    if (!currentCourse) return;
    const first = currentCourse.lessons.findIndex(l => !record(currentCourse)?.completed.includes(l.id));
    currentLesson = first < 0 ? 0 : first;
    renderCourse();
    const dialog = $('#course-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    requestAnimationFrame(() => {
      dialog.scrollTop = 0;
      const list = $('.lesson-list');
      if (list) list.scrollTop = 0;
      $('.lesson-row.selected')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }
  function renderCourse() {
    destroyStrictPlayer();
    clampToUnlockedLesson();
    const c = currentCourse;
    const lesson = c.lessons[currentLesson];
    const item = record(c);
    const isDone = item?.completed.includes(lesson.id);
    const watched = !lesson.video || isDone || isLessonWatched(c.id, lesson.id);
    const lessonQuizDone = !lesson.quiz?.length || lessonQuizPassed(c, lesson.id);
    const canGoNext = isDone && lessonQuizDone && currentLesson < c.lessons.length - 1 && isLessonUnlocked(c, currentLesson + 1);
    let content = '';
    // Video always comes first whenever the lesson has one.
    if (lesson.video) {
      content += item
        ? `<div class="video-frame strict-video"><div id="kk-strict-player"></div></div>`
        : `<div class="video-frame strict-video"><iframe src="${escape(lesson.video)}" title="${escape(lesson.title)} video preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="video-watch-hint" style="position:absolute;left:12px;bottom:12px;margin:0;padding:8px 10px;border-radius:8px;background:rgba(16,60,46,.92);color:#f4f7ef">Start the course to track watch progress.</p></div>`;
    }
    if (!item && !lesson.video) {
      content += `<article class="course-preview">
        <img src="${escape(c.image)}" alt="${escape(c.title)}" width="720" height="405">
        <div><h4>Build your skills, one lesson at a time.</h4>
        <p>Preview the curriculum, then start the course to unlock videos, labs, quizzes, and progress tracking.</p></div>
      </article>`;
    }
    if (lesson.body) {
      content += `<article class="lesson-reading">
        <p>${escape(lesson.body)}</p>
        ${lesson.practice ? `<div class="practice-task"><strong>Your practice task</strong><p>${escape(lesson.practice)}</p></div>` : ''}
        ${lesson.readingUrl ? `<a class="button" href="${escape(lesson.readingUrl)}" target="_blank" rel="noopener">${escape(lesson.readingLabel)} ↗</a>` : ''}
      </article>`;
    }
    if (item && lesson.lab === 'python') {
      content += `<section class="code-lab" aria-label="Python compiler">
        <div class="code-lab-header"><h3>Python lab</h3><button type="button" class="button primary" id="run-python">Run code →</button></div>
        <p class="notes-hint">Practice here in the browser. Django project steps still need Python installed on your computer.</p>
        <textarea id="python-code" class="code-editor" spellcheck="false" aria-label="Python code">${escape(lesson.starterCode || '# Write Python here\nprint("Hello, KK Learning")\n')}</textarea>
        <pre id="python-output" class="code-output" aria-live="polite">Output will appear here.</pre>
      </section>`;
    }
    if (item && lesson.lab === 'web') {
      content += `<section class="code-lab" aria-label="Web sandbox">
        <div class="code-lab-header"><h3>Web lab (HTML / CSS / JS)</h3><button type="button" class="button primary" id="run-web">Refresh preview →</button></div>
        <textarea id="web-code" class="code-editor" spellcheck="false" aria-label="HTML code">${escape(lesson.starterCode || '<h1>Hello</h1>')}</textarea>
        <iframe id="web-preview" class="web-preview" title="Web preview" sandbox="allow-scripts"></iframe>
      </section>`;
    }
    if (!content) {
      content = `<article class="course-preview">
        <img src="${escape(c.image)}" alt="${escape(c.title)}" width="720" height="405">
        <div><h4>Study this lesson</h4><p>Open the full course guide to study this topic and its learning resources.</p></div>
      </article>`;
    }
    const stickyTitle = $('#dialog-course-title');
    if (stickyTitle) stickyTitle.textContent = c.title;
    $('#course-dialog-content').innerHTML = `
      <header class="dialog-heading">
        <div class="dialog-heading-top">
          <div>
            <span class="course-category">${escape(c.categoryLabel)} · ${escape(c.format || 'Video lessons')}</span>
            <h2 id="dialog-title">${escape(c.title)}</h2>
          </div>
          <span class="course-enrollment-status">${item ? `${count(c)} of ${c.lessons.length} lessons completed` : 'Enroll to save progress'}</span>
        </div>
        <p>${escape(c.description)} ${c.id === 'electrician' ? 'Practical electrical work requires qualified supervision and compliance with local requirements.' : ''}</p>
        <div class="course-overview-meta"><span>▤ ${c.lessons.length} lessons</span><span>◷ ${escape(c.duration || 'Self-paced')}</span><span>✓ Video lessons</span><span>○ Quiz unlocks</span>${c.track === 'internship' ? '<span>✦ Internship track</span>' : ''}</div>
        ${c.careers ? `<p class="course-careers-line"><strong>Career opportunities:</strong> ${escape(c.careers)}</p>` : ''}
        <div class="course-start-bar">
          <div class="course-start-actions">
            ${!item ? '<button class="button primary" id="enroll">Start this course →</button>' : ''}
            <a class="button" href="${escape(c.page)}" target="_blank" rel="noopener">Full course guide ↗</a>
          </div>
        </div>
      </header>
      <div class="player-layout">
        <section class="lesson-panel" aria-labelledby="active-lesson-title">
          <div class="lesson-heading"><span class="eyebrow">${!item ? 'LESSON PREVIEW' : lesson.video && lesson.lab ? 'WATCH · LAB · QUIZ' : 'WATCH · LEARN · PRACTICE'}</span><span>Lesson ${currentLesson + 1} of ${c.lessons.length}</span></div>
          <h3 class="lesson-title" id="active-lesson-title">${escape(lesson.title)}</h3>
          ${content}
          ${item ? `<div class="lesson-actions"><button class="button primary" id="complete-lesson" ${!isDone && lesson.video && !watched ? 'hidden' : ''}>${isDone ? '✓ Completed · undo' : 'Mark lesson complete ✓'}</button>${lesson.quiz?.length ? `<button class="button" id="lesson-quiz" ${isDone ? '' : 'disabled'}>${lessonQuizDone ? '✓ Lesson quiz passed' : 'Take lesson quiz'}</button>` : ''}${currentLesson < c.lessons.length - 1 ? `<button class="button" id="next-lesson" ${canGoNext ? '' : 'disabled'}>Next lesson →</button>` : `<button class="button" id="go-quiz" ${count(c) === c.lessons.length && [...c.lessons].every(l => !l.quiz?.length || lessonQuizPassed(c, l.id)) ? '' : 'disabled'}>Final knowledge check</button>`}</div>
            ${lesson.video && !isDone && !watched ? '<p class="video-watch-hint" id="video-watch-hint">Finish watching the full video. Skipping ahead and speed changes are locked; rewinding is allowed.</p>' : isDone && lesson.quiz?.length && !lessonQuizDone ? '<p class="video-watch-hint" id="video-watch-hint">Pass this lesson quiz (3 of 5 correct) to unlock the next lesson.</p>' : !isDone ? '<p class="video-watch-hint" id="video-watch-hint">Complete this lesson before the next one unlocks.</p>' : '<p class="video-watch-hint" id="video-watch-hint" hidden></p>'}
            <div class="lesson-notes"><label class="notes-label" for="lesson-notes">Your lesson notes</label><textarea class="notes-input" id="lesson-notes" maxlength="10000" placeholder="Write an idea to remember or a question to revisit…">${escape(item.notes[lesson.id] || '')}</textarea><p class="notes-hint">Saved automatically. ${user && cloudReady ? 'Synced to your account.' : 'Stored in this browser.'}</p></div>` : '<p class="preview-hint">Preview mode. Start the course above to unlock progress tracking, labs, and quizzes.</p>'}
        </section>
        <aside class="curriculum-panel" aria-label="Course curriculum">
          <div class="curriculum-header"><h3>Course curriculum</h3><span>${count(c)}/${c.lessons.length}</span></div>
          ${progress(c)}
          <p class="curriculum-hint">${item ? 'Complete each lesson in order. Later lessons stay locked until you finish the previous one.' : 'Preview any lesson. After you enroll, lessons unlock in order.'}</p>
          <div class="lesson-list">${c.lessons.map((l,i) => {
            const done = item?.completed.includes(l.id);
            const quizDone = !l.quiz?.length || lessonQuizPassed(c, l.id);
            const unlocked = !item || isLessonUnlocked(c, i);
            const selected = i === currentLesson;
            return `<button class="lesson-row ${selected ? 'selected' : ''} ${done && quizDone ? 'done' : ''} ${unlocked ? '' : 'locked'}" data-lesson="${i}" ${selected ? 'aria-current="step"' : ''} ${unlocked ? '' : 'aria-disabled="true"'}><span>${done && quizDone ? '✓' : unlocked ? i+1 : '◌'}</span><span>${escape(l.title)}</span>${selected ? '<span class="lesson-current" aria-hidden="true">→</span>' : unlocked ? '' : '<span class="lesson-lock-label">Locked</span>'}</button>`;
          }).join('')}</div>
          <p class="notes-hint">${c.tools?.includes('python-lab') ? 'Videos, labs, and a quiz after each lesson.' : 'Video lessons with ordered unlock and knowledge checks.'}</p>
        </aside>
      </div>`;
    if (item && lesson.video) mountStrictPlayer(lesson.video, c.id, lesson.id);
    else if (!item && lesson.video) {/* preview iframe already rendered */}
    if (item) mountLessonLabs(lesson);
  }
  document.addEventListener('click', async event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.view || target.dataset.goto) {
      setView(target.dataset.view || target.dataset.goto);
      if (target.dataset.goto) { $('#main').scrollIntoView({behavior:'smooth'}); $('#main').focus({preventScroll:true}); }
    }
    if (target.dataset.category || target.dataset.track) {
      category = target.dataset.category || target.dataset.track;
      document.querySelectorAll('[data-category], [data-track]').forEach(b => {
        const key = b.dataset.category || b.dataset.track;
        const on = key === category;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
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
    if (target.dataset.lesson !== undefined) {
      const index = Number(target.dataset.lesson);
      if (!currentCourse) return;
      if (record(currentCourse) && !isLessonUnlocked(currentCourse, index)) {
        notify('Complete the previous lesson first. Lessons unlock one by one.');
        return;
      }
      currentLesson = index;
      renderCourse();
    }
    if (target.id === 'enroll') {
      state.courses[currentCourse.id] = {enrolled:true, completed:[], notes:{}, lessonQuizzes:{}, quizPassed:false};
      currentLesson = 0;
      save(); render(); renderCourse(); notify('You’re enrolled. Start with lesson 1 — later lessons unlock after each quiz.');
    }
    if (target.id === 'complete-lesson') {
      const item = record(currentCourse);
      const lesson = currentCourse.lessons[currentLesson];
      const id = lesson.id;
      if (item.completed.includes(id)) {
        item.completed = item.completed.filter(x => x !== id);
        const cut = currentLesson;
        item.completed = item.completed.filter(doneId => {
          const idx = currentCourse.lessons.findIndex(l => l.id === doneId);
          return idx >= 0 && idx < cut;
        });
        item.lessonQuizzes = item.lessonQuizzes || {};
        for (const lessonItem of currentCourse.lessons) {
          const idx = currentCourse.lessons.findIndex(l => l.id === lessonItem.id);
          if (idx >= cut) delete item.lessonQuizzes[lessonItem.id];
        }
      } else {
        if (lesson.video && !isLessonWatched(currentCourse.id, id)) {
          notify('Finish watching the full video at normal speed before marking this lesson complete.');
          return;
        }
        item.completed.push(id);
        save(); render(); renderCourse();
        if (lesson.quiz?.length && !lessonQuizPassed(currentCourse, id)) {
          notify('Lesson marked complete. Pass the lesson quiz to unlock the next lesson.');
          openLessonQuizDialog(lesson);
        } else if (finished(currentCourse)) notify('Course completed. A milestone worth celebrating!');
        return;
      }
      save(); render(); renderCourse();
      if (finished(currentCourse)) notify('Course completed. A milestone worth celebrating!');
    }
    if (target.id === 'lesson-quiz') {
      const lesson = currentCourse.lessons[currentLesson];
      if (!record(currentCourse)?.completed.includes(lesson.id)) {
        notify('Mark the lesson complete before taking the quiz.');
        return;
      }
      openLessonQuizDialog(lesson);
    }
    if (target.id === 'next-lesson') {
      const lesson = currentCourse.lessons[currentLesson];
      if (!record(currentCourse)?.completed.includes(lesson.id)) {
        notify('Mark this lesson complete before moving to the next one.');
        return;
      }
      if (lesson.quiz?.length && !lessonQuizPassed(currentCourse, lesson.id)) {
        notify('Pass this lesson quiz first. You need at least 3 correct answers.');
        openLessonQuizDialog(lesson);
        return;
      }
      if (!isLessonUnlocked(currentCourse, currentLesson + 1)) {
        notify('Complete the previous lesson and quiz first. Lessons unlock one by one.');
        return;
      }
      currentLesson++;
      renderCourse();
    }
    if (target.id === 'go-quiz') {
      if (count(currentCourse) !== currentCourse.lessons.length) {
        notify('Complete every lesson in order before the final knowledge check.');
        return;
      }
      if (!currentCourse.lessons.every(l => !l.quiz?.length || lessonQuizPassed(currentCourse, l.id))) {
        notify('Pass every lesson quiz before the final knowledge check.');
        return;
      }
      openCourseQuizDialog();
    }
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
    const mode = event.target.dataset.quizMode || 'course';
    const lesson = mode === 'lesson' ? c.lessons.find(l => l.id === activeLessonQuizId) : null;
    const quiz = mode === 'lesson' ? lesson?.quiz : c.quiz;
    if (!quiz?.length) return;
    const score = quiz.reduce((n,q,i) => n + (Number(data.get(`q${i}`)) === q.answer ? 1 : 0), 0);
    const passed = score >= QUIZ_PASS_SCORE;
    if (passed) {
      if (mode === 'lesson' && lesson) {
        record(c).lessonQuizzes = record(c).lessonQuizzes || {};
        record(c).lessonQuizzes[lesson.id] = true;
      } else record(c).quizPassed = true;
      save(); render();
      if ($('#course-dialog').open) renderCourse();
    }
    $('#quiz-result').hidden = false;
    $('#quiz-result').innerHTML = `<strong>${score}/${quiz.length} correct. ${passed ? `Passed (${QUIZ_PASS_SCORE}+ required)!` : `You need at least ${QUIZ_PASS_SCORE} correct to pass. Try again.`}</strong><br>${quiz.map((q,i) => `${Number(data.get(`q${i}`)) === q.answer ? '✓' : '○'} ${escape(q.explanation)}`).join('<br>')}${passed && mode === 'lesson' ? '<br>Next lesson is unlocked when you continue.' : ''}${passed && mode === 'course' && finished(c) ? '<br>✦ All lessons and the final knowledge check completed. Well done!' : ''}`;
    if (passed) notify(mode === 'lesson' ? 'Lesson quiz passed. Next lesson unlocked.' : 'Final knowledge check passed!');
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
          $('#save-status').textContent = 'Saved on this device';
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
