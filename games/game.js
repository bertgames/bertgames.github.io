(function () {
  function init() {
    var lightbox = document.getElementById('lightbox');
    console.log('[gbc-lightbox] init — lightbox element:', lightbox);
    if (!lightbox) {
      console.warn('[gbc-lightbox] no #lightbox element on page — nothing to do');
      return;
    }

    var lbImg = lightbox.querySelector('.lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var screenshots = document.querySelectorAll('.screenshot img');
    console.log('[gbc-lightbox] screenshot images found:', screenshots.length);

    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    function closeLb() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      document.body.classList.remove('no-scroll');
    }

    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'IMG' && t.closest && t.closest('.screenshot')) {
        console.log('[gbc-lightbox] screenshot clicked:', t.src);
        openLb(t.src, t.alt);
      }
    });

    lightbox.addEventListener('click', closeLb);
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeLb();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLb();
    });

    console.log('[gbc-lightbox] ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
