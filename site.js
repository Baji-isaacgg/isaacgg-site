/* ISAAC.GG site — language toggle (persisted), scroll reveal, FAQ accordion, mobile menu. */
(function () {
  var KEY = 'isaac_lang';
  var html = document.documentElement;

  function setLang(l) {
    html.classList.remove('lang-en', 'lang-ja');
    html.classList.add('lang-' + l);
    html.setAttribute('lang', l);
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === l);
    });
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved === 'ja' || saved === 'en'
    ? saved
    : ((navigator.language || '').toLowerCase().indexOf('ja') === 0 ? 'ja' : 'en');
  setLang(initial);

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang-btn]');
    if (b) setLang(b.getAttribute('data-lang-btn'));
  });

  // scroll reveal
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // FAQ accordion
  document.querySelectorAll('.qa button').forEach(function (b) {
    b.addEventListener('click', function () { b.parentElement.classList.toggle('open'); });
  });

  // mobile menu
  var mb = document.getElementById('menuBtn');
  var nl = document.getElementById('navlinks');
  if (mb && nl) {
    mb.addEventListener('click', function () { nl.classList.toggle('open'); });
    nl.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nl.classList.remove('open'); }); });
  }
})();
