(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lbImg = lightbox.querySelector('.lightbox-img');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.classList.remove('no-scroll');
  }

  var triggers = document.querySelectorAll('.screenshot img');
  for (var i = 0; i < triggers.length; i++) {
    (function (img) {
      img.addEventListener('click', function () {
        open(img.getAttribute('src'), img.getAttribute('alt'));
      });
    })(triggers[i]);
  }

  lightbox.addEventListener('click', close);
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      close();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();
