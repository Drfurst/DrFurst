document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ══════════════════════════════
   gallery.js
   A Life in Pictures — Tab switcher
   No dependencies, vanilla JS
══════════════════════════════ */

(function () {
  'use strict';

  function initGallery() {
    const tabs   = document.querySelectorAll('.gallery-tab');
    const panels = document.querySelectorAll('.gallery-panel');

    if (!tabs.length || !panels.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-tab');

        // ── Update tabs ──
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // ── Update panels ──
        panels.forEach(function (panel) {
          if (panel.getAttribute('data-panel') === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

})();

/* ══════════════════════════════
   testimonials-slider.js
   Testimonials Slider functionality
   No dependencies, vanilla JS
══════════════════════════════ */

(function () {
  'use strict';

  function initTestimonialsSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Update dots
    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Update navigation buttons
    function updateNavButtons() {
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
      if (slideIndex < 0 || slideIndex >= totalSlides) return;

      currentSlide = slideIndex;
      const translateX = -currentSlide * 100;
      track.style.transform = `translateX(${translateX}%)`;

      updateDots();
      updateNavButtons();
      resetAutoPlay();
    }

    // Next slide
    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(0); // Loop back to first slide
      }
    }

    // Previous slide
    function prevSlide() {
      if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
      } else {
        goToSlide(totalSlides - 1); // Loop to last slide
      }
    }

    // Auto play functionality
    function startAutoPlay() {
      autoPlayInterval = setInterval(() => {
        nextSlide();
      }, 8000); // Change slide every 8 seconds
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      stopAutoPlay();
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      e.preventDefault();
    }

    function handleTouchEnd(e) {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      resetAutoPlay();
    }

    // Mouse drag support for desktop
    let mouseStartX = 0;
    let isMouseDragging = false;

    function handleMouseDown(e) {
      mouseStartX = e.clientX;
      isMouseDragging = true;
      stopAutoPlay();
      track.style.cursor = 'grabbing';
    }

    function handleMouseMove(e) {
      if (!isMouseDragging) return;
      e.preventDefault();
    }

    function handleMouseUp(e) {
      if (!isMouseDragging) return;
      isMouseDragging = false;
      track.style.cursor = 'grab';

      const endX = e.clientX;
      const diffX = mouseStartX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }

      resetAutoPlay();
    }

    // Keyboard navigation
    function handleKeyDown(e) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case ' ':
        case 'Enter':
          if (e.target.classList.contains('testimonial-dot')) {
            e.preventDefault();
          }
          break;
      }
    }

    // Pause auto-play when user hovers over slider
    function handleMouseEnter() {
      stopAutoPlay();
    }

    function handleMouseLeave() {
      startAutoPlay();
    }

    // Initialize slider
    function init() {
      createDots();
      updateNavButtons();

      // Event listeners for navigation buttons
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);

      // Touch events
      track.addEventListener('touchstart', handleTouchStart, { passive: true });
      track.addEventListener('touchmove', handleTouchMove, { passive: false });
      track.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Mouse events
      track.addEventListener('mousedown', handleMouseDown);
      track.addEventListener('mousemove', handleMouseMove);
      track.addEventListener('mouseup', handleMouseUp);
      track.addEventListener('mouseleave', handleMouseUp);

      // Keyboard navigation
      document.addEventListener('keydown', handleKeyDown);

      // Auto-play pause/resume on hover
      const slider = document.querySelector('.testimonials-slider');
      if (slider) {
        slider.addEventListener('mouseenter', handleMouseEnter);
        slider.addEventListener('mouseleave', handleMouseLeave);
      }

      // Start auto-play
      startAutoPlay();

      // Set initial cursor style
      track.style.cursor = 'grab';
    }

    // Initialize when DOM is ready
    init();
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsSlider);
  } else {
    initTestimonialsSlider();
  }

})();
