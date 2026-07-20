class GalleryThumbs extends HTMLElement {
  constructor() {
    super();
    this.thumbs = this.querySelectorAll('.js-gallery-thumb');
    this.mediaGallery = document.querySelector('media-gallery');

    if(this.getAttribute('data-is-disabled') === 'true') return;

    this.addEventListener('click', e => {;
      if(e.target.closest('.js-gallery-thumb')) {
        this.updateGallery(e.target.closest('.js-gallery-thumb'))
      }
    })
  }

  updateGallery(clickedThumb) {
    const thumbIndex = clickedThumb.getAttribute('data-slide-index');
    if(!thumbIndex) return;

    this.thumbs.forEach(thumb => thumb.classList.remove('embla-thumbs__slide--selected'))
    clickedThumb.classList.add('embla-thumbs__slide--selected');

    this.mediaGallery.thumbClickHandler(thumbIndex);
  }
}

customElements.define('gallery-thumbs', GalleryThumbs);
