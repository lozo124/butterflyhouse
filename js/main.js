/**
 * ItamiHome ButterflyHouse — Static Page Scripts
 */
(function () {
  'use strict';

  // Lazy-load images with IntersectionObserver
  document.addEventListener('DOMContentLoaded', function () {
    var lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '100px' });
      lazyImages.forEach(function (img) { observer.observe(img); });
    } else {
      // Fallback: load all immediately
      lazyImages.forEach(function (img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Mobile floating CTA — show after scrolling 30%
    var floatingCta = document.getElementById('floatingCta');
    if (floatingCta) {
      var triggerShown = false;
      function checkScroll() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;
        if (scrollPercent >= 0.3 && !triggerShown) {
          floatingCta.classList.add('visible');
          triggerShown = true;
        }
      }
      window.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }
  });
})();
