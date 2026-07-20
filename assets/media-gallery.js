if (!customElements.get('media-gallery')) {
  customElements.define(
    'media-gallery',
    class MediaGallery extends HTMLElement {
      constructor() {
        super();
        this.elements = {
          liveRegion: this.querySelector('[id^="GalleryStatus"]'),
          viewer: this.querySelector('[id^="GalleryViewer"]'),
          media: this.querySelectorAll('[data-media-id]'),
        };
        this.desktopStacked = this.dataset.desktopLayout === 'stacked';
        this.enableMediaGroup = this.dataset.enableMediaGroup === 'true';
        this.container = this.querySelector('.embla__container');
      }

      connectedCallback() {
        document.body.addEventListener(
          'setActiveMediaTrigger',
          this.updateMedia.bind(this)
        );

        this.setInitialMedia();
      }

      setInitialMedia() {
        const activeMedia = this.querySelector(`[data-media-id="${this.dataset.activeMediaId}"]`);
        if (activeMedia) {
          this.updateGalleryThumbs(activeMedia);
        }
      }

      updateMedia(event) {
        const isStickyForm = event.detail.isStickyForm;
        if (isStickyForm) {
          this.setStickyMedia(event);
        } else {
          this.setActiveMedia(event);
        }
      }

      reinitializeEmbla() {
        const carousel = this.querySelector('embla-component');
        if (!carousel) return;

        if (!carousel.emblaApi) {
          carousel.initEmbla();
          carousel.handleSelect();
          carousel.emblaApi.on('select', () => carousel.handleSelect());
        } else {
          carousel.restart();
        }
      }

      setActiveMedia(event) {
        const mediaId = event.detail.mediaId;
        const activeMedia = this.querySelector(`[data-media-id="${mediaId}"]`);
        this.updateGalleryThumbs(activeMedia);
      }

      setStickyMedia(event) {
        const mediaSrc = event.detail.mediaSrc;
        const stickyThumbnail = document.querySelector(`.sticky-cart__thumbnail`)
        if(stickyThumbnail) {
          stickyThumbnail.src = `${mediaSrc}?width=60`;
          stickyThumbnail.srcset = `${mediaSrc}?width=60 300w`;
        }
      }

      thumbClickHandler(index) {
        const activeMedia = this.querySelector(`[data-slide-index="${index}"]`);
        this.updateGalleryThumbs(activeMedia);
      }

      updateGalleryThumbs(activeMedia) {
        const mql = window.matchMedia('(min-width: 990px)');

        this.elements.media.forEach((element) => {
          element.classList.remove('is-active');
        });

        activeMedia?.classList.add('is-active');

        if (mql.matches && this.desktopStacked) {
          // Desktop stacked layout
          activeMedia?.scrollIntoView({behavior: 'smooth', block: 'center'});
        } else {
          this.updateSlider(activeMedia);
        }
      }

      updateSlider(activeMedia) {
        const carousel = this.querySelector('embla-component');
        const activeMediaSlide = activeMedia?.closest('.embla__slide');

        const activeMediaIndex = Number(
          activeMediaSlide?.getAttribute('data-slide-index'),
        );

        if (carousel && activeMediaSlide && carousel.slideToIndex) {
          carousel.slideToIndex(activeMediaIndex);
        }
      }

      announceLiveRegion(activeItem, position) {
        const image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;
        image.onload = () => {
          this.elements.liveRegion.setAttribute('aria-hidden', false);
          this.elements.liveRegion.innerHTML =
            window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(() => {
            this.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };
        image.src = image.src; // Trigger reload
      }

      preventStickyHeader() {
        this.stickyHeader =
          this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }
    }
  );
}
