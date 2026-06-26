/* ══════════════════════════════
   script.js
   Dr. Arthur Furst — Main JS
   Requires: jQuery + Slick Carousel
══════════════════════════════ */
/* ── 0. Film strip infinite scroll ── */
window.addEventListener('load', function () {

  function startStrip(selector, speed) {
    var strip = document.querySelector(selector);
    if (!strip) return;
    var pos = 0;
    strip.style.animation = 'none';

    function tick() {
      pos += speed;
      if (pos >= strip.scrollWidth / 2) pos = 0;
      strip.style.transform = 'translateX(-' + pos + 'px)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  startStrip('.film-scroll', 0.5);
  startStrip('.film-scroll-mobile', 0.5);
});


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

  var $track = $('.testimonials-track');

  $track.slick({
    slidesToShow:   1,
    slidesToScroll: 1,
    autoplay:       true,
    autoplaySpeed:  8000,
    speed:          800,
    fade:           false,
    cssEase:        'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    arrows:         false,   /* ← disable built-in arrows entirely */
    dots:           false,
    draggable:      true,
    swipe:          true,
    touchMove:      true,
    infinite:       true,
    adaptiveHeight: false,
    waitForAnimate: true,
    responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow:  1,
            slidesToScroll: 1,
            centerMode:    true,
            centerPadding:  '24px',
            arrows:        false,
          }
        }
      ]
  });

  /* Wire your custom buttons manually */
  $('#testimonials-prev').on('click', function () {
    $track.slick('slickPrev');
  });

  $('#testimonials-next').on('click', function () {
    $track.slick('slickNext');
  });

  /* Pause on hover */
  $('.testimonials-slider').on('mouseenter', function () {
    $track.slick('slickPause');
  }).on('mouseleave', function () {
    $track.slick('slickPlay');
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

        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

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

/* ── 4. Biography Read More toggle ── */
function toggleBio(btn) {
  var expanded = document.getElementById('bio-expanded');
  var isOpen = expanded.style.opacity === '1';

  if (isOpen) {
    expanded.style.maxHeight = '0';
    expanded.style.opacity = '0';
    btn.textContent = 'Read More';
  } else {
    expanded.style.maxHeight = expanded.scrollHeight + 'px';
    expanded.style.opacity = '1';
    btn.textContent = 'Read Less';
  }
}

/* ── 5. Scholarship Slider ── */
$(document).ready(function () {

  $('.scholars-track').slick({
    slidesToShow:   3,          /* 3 visible on desktop */
    slidesToScroll: 1,
    autoplay:       true,
    autoplaySpeed:  3500,
    speed:          700,
    cssEase:        'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    arrows:         false,
    dots:           false,
    infinite:       true,
    draggable:      true,
    swipe:          true,
    touchMove:      true,
    centerMode:     false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow:  1,
          slidesToScroll: 1,
          centerMode:    true,
          arrows: false,
          centerPadding: '40px'
        }
      }
    ]
  });

  /* Pause on hover */
  $('.scholars-slider-wrap').on('mouseenter', function () {
    $('.scholars-track').slick('slickPause');
  }).on('mouseleave', function () {
    $('.scholars-track').slick('slickPlay');
  });

  /* Wire custom nav buttons */
    $('#scholars-prev').on('click', function () {
      $('.scholars-track').slick('slickPrev');
    });
    $('#scholars-next').on('click', function () {
      $('.scholars-track').slick('slickNext');
    });

});

/* ── 6. Testimonial Read More toggle ── */
function toggleQuote(btn) {
  var quote = btn.previousElementSibling;
  var isExpanded = quote.classList.contains('expanded');
  quote.classList.toggle('expanded');
  btn.textContent = isExpanded ? 'Read More' : 'Read Less';
}

/* ── 7. Hide Read More if quote isn't truncated ── */
$(document).ready(function() {
  document.querySelectorAll('.testimonial-card blockquote').forEach(function(quote) {
    var btn = quote.nextElementSibling;
    if (!btn || !btn.classList.contains('testimonial-read-more')) return;

    // Check if content is actually being clamped
    if (quote.scrollHeight <= quote.clientHeight) {
      btn.style.display = 'none';
    }
  });
});

/* ── 8. Nav active state on scroll ── */
/* ── 8. Nav active state on scroll ── */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var isScrollingFromClick = false;
  var scrollTimer = null;

  function setActive(current) {
    navLinks.forEach(function (link) {
      link.classList.remove('nav-active');
      var href = link.getAttribute('href');
      if (current === '' && href === '#') {
        link.classList.add('nav-active');
      } else if (href === '#' + current) {
        link.classList.add('nav-active');
      }
    });
  }

  function onScroll() {
    if (isScrollingFromClick) return; // suppress during click-scroll

    var scrollY = window.scrollY + 80;
    var current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        current = sec.getAttribute('id');
      }
    });

    if (window.scrollY < 100) current = '';
    setActive(current);
  }

  // On click: immediately set the target as active and suppress scroll tracking
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var href = link.getAttribute('href');
      if (href === '#') {
        setActive('');
      } else {
        var id = href.replace('#', '');
        setActive(id);
      }

      isScrollingFromClick = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        isScrollingFromClick = false;
      }, 1000); // re-enable after scroll animation finishes
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());

/* ── 9. GLightbox init ── */
document.addEventListener('DOMContentLoaded', function () {
  var lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    closeButton: true,
    keyboardNavigation: true,
    descPosition: 'bottom',
  });

  /* Re-init when gallery tab switches so only active panel photos are grouped */
  document.querySelectorAll('.gallery-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      setTimeout(function () {
        lightbox.reload();
      }, 350);
    });
  });
});