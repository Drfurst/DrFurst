/* ══════════════════════════════
   script.js
   Dr. Arthur Furst — Main JS
   Requires: jQuery + Slick Carousel
══════════════════════════════ */

/* ── 1. Smooth scroll for nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── 2. Slick Testimonials Slider ── */
$(document).ready(function () {

  $('.testimonials-track').slick({
    slidesToShow:   1,
    slidesToScroll: 1,
    autoplay:       true,
    autoplaySpeed:  8000,
    speed:          800,        /* smooth transition speed */
    fade:           false,
    cssEase:        'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    arrows:         true,
    dots:           false,      /* no dots */
    draggable:      true,
    swipe:          true,
    touchMove:      true,
    infinite:       true,       /* true infinite — no jump */
    adaptiveHeight: false,
    waitForAnimate: true,       /* prevent double-click skip */

    /* Use your existing prev/next buttons */
    prevArrow: $('#testimonials-prev'),
    nextArrow: $('#testimonials-next'),

    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots:   false
        }
      }
    ]
  });

  /* Pause on hover */
  $('.testimonials-slider').on('mouseenter', function () {
    $('.testimonials-track').slick('slickPause');
  }).on('mouseleave', function () {
    $('.testimonials-track').slick('slickPlay');
  });

});

/* ── 3. Gallery tab switcher ── */
(function () {
  'use strict';

  function initGallery() {
    var tabs   = document.querySelectorAll('.gallery-tab');
    var panels = document.querySelectorAll('.gallery-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');

        /* Update tabs */
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        /* Update panels */
        panels.forEach(function (panel) {
          panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

}());