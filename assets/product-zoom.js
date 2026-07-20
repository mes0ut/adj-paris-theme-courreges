document.addEventListener('DOMContentLoaded', function () {
  // ---- Lightbox oluştur (tek sefer) ----
  const overlay = document.createElement('div');
  overlay.className = 'pz-lightbox__overlay';
  overlay.innerHTML = `
    <button class="pz-lightbox__close" type="button" aria-label="Close">×</button>
    <img class="pz-lightbox__img" alt="" />
  `;
  document.body.appendChild(overlay);
  const lbImg = overlay.querySelector('.pz-lightbox__img');
  const lbClose = overlay.querySelector('.pz-lightbox__close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('is-open');
  }
  function closeLightbox() {
    overlay.classList.remove('is-open');
    lbImg.src = '';
  }
  overlay.addEventListener('click', (e) => {
    // Img’e tıklayınca da kapanmasını istemiyorsan hedef kontrolü ekle
    if (e.target === overlay || e.target === lbClose) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });

  // ---- Lens Zoom init ----
  const containers = document.querySelectorAll('.ProductZoom');

  containers.forEach((c) => {
    const img = c.querySelector('img');
    const lens = c.querySelector('.ProductZoom__Lens');
    const zoomSrc = c.getAttribute('data-zoom-src') || img.currentSrc || img.src;
    const alt = img.getAttribute('alt') || '';

    // Yüksek çözünürlük
    const zoomImg = new Image();
    zoomImg.src = zoomSrc;

    let rect, scaleX, scaleY;
    let lensVisible = false;

    function move(e) {
      const isTouch = e.type.startsWith('touch');
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      rect = c.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

      if (!lensVisible) { lens.style.display = 'block'; lensVisible = true; }

      // Görsel ekranda ölçekli olabilir → oran hesapla
      scaleX = zoomImg.naturalWidth  / rect.width;
      scaleY = zoomImg.naturalHeight / rect.height;

      // Lens konumu
      const lw = lens.offsetWidth, lh = lens.offsetHeight;
      lens.style.left = (x - lw / 2) + 'px';
      lens.style.top  = (y - lh / 2) + 'px';

      // Arka plan pozisyonu (yakın plan)
      const bgX = -(x * scaleX - lw / 2);
      const bgY = -(y * scaleY - lh / 2);
      if (!lens.style.backgroundImage) {
        lens.style.backgroundImage = `url("${zoomSrc}")`;
        lens.style.backgroundSize  = `${zoomImg.naturalWidth}px ${zoomImg.naturalHeight}px`;
      }
      lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
    }

    function enter() {
      if (window.matchMedia('(hover: hover)').matches) {
        lens.style.display = 'block';
        lensVisible = true;
      }
    }
    function leave() {
      lens.style.display = 'none';
      lensVisible = false;
    }

    c.addEventListener('mousemove', move);
    c.addEventListener('mouseenter', enter);
    c.addEventListener('mouseleave', leave);

    // Mobil: tıklayınca lightbox (pinch-to-zoom tarayıcıya bırak)
    c.addEventListener('click', () => openLightbox(zoomSrc, alt));

    // (Opsiyonel) dokunmatik lens; ama genelde mobilde kapalı tutuyoruz
    c.addEventListener('touchstart', () => {}, {passive: true});
    c.addEventListener('touchmove', move, {passive: true});
    c.addEventListener('touchend', leave, {passive: true});
  });
});
