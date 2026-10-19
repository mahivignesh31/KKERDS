(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id = new URLSearchParams(location.search).get('course');
  const course = window.KK_COURSES.find(c => c.id === id && c.format);
  if (!course) {
    document.querySelector('#guide-description').textContent = 'This course guide could not be found. Return to the LMS to choose an available learning path.';
    return;
  }
  document.title = `${course.title} — KK Learning course guide`;
  document.querySelector('#guide-title').textContent = course.title;
  document.querySelector('#guide-description').textContent = course.description;
  document.querySelector('#guide-start').href = `lms.html?course=${encodeURIComponent(course.id)}`;
  document.querySelector('#guide-content').innerHTML = `<p class="guide-intro">${course.lessons.length} self-paced lessons · Guided reading and practical exercises · Knowledge check in the LMS</p>` + course.lessons.map((l,i) => `<article class="lesson-reading"><span class="eyebrow">LESSON ${i+1}</span><h2>${escape(l.title)}</h2><p>${escape(l.body)}</p><div class="practice-task"><strong>Your practice task</strong><p>${escape(l.practice)}</p></div><a class="button" href="${escape(l.readingUrl)}" target="_blank" rel="noopener">${escape(l.readingLabel)} ↗</a></article>`).join('');
})();
