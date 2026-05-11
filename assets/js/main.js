(function() {
  'use strict';

  function throttle(fn, ms) {
    var last = 0;
    return function() {
      var now = Date.now();
      if (now - last >= ms) {
        last = now;
        fn.apply(null, arguments);
      }
    };
  }

  function revealElements() {
    var reveals = document.querySelectorAll('.hero-section, .section.animate');
    var windowHeight = window.innerHeight;
    var i, el, top;

    for (i = 0; i < reveals.length; i++) {
      el = reveals[i];
      top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add('visible');
      }
    }
  }

  function animateSkillBars() {
    var section = document.querySelector('.skills-section');
    if (!section || section.classList.contains('skills-animated')) return;

    var rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      var bars = section.querySelectorAll('.level-bar-inner');
      var i, bar, target;
      for (i = 0; i < bars.length; i++) {
        bar = bars[i];
        target = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout((function(b, w) {
          return function() { b.style.width = w; };
        })(bar, target), i * 70);
      }
      section.classList.add('skills-animated');
    }
  }

  function initSkillBars() {
    var bars = document.querySelectorAll('.level-bar-inner');
    var i;
    for (i = 0; i < bars.length; i++) {
      bars[i].setAttribute('data-width', bars[i].style.width);
      bars[i].style.width = '0';
    }
  }

  function initAnimations() {
    var sections = document.querySelectorAll('.section');
    var i;
    for (i = 0; i < sections.length; i++) {
      sections[i].classList.add('animate');
    }
  }

  function onScroll() {
    revealElements();
    animateSkillBars();
  }

  document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSkillBars();
    revealElements();
    animateSkillBars();
    window.addEventListener('scroll', throttle(onScroll, 100));
  });
})();
