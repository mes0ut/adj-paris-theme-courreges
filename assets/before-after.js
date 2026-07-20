if (!customElements.get('before-after')) {
  class BeforeAfter extends HTMLElement {
    constructor() {
      super();
      
      this.container = this.querySelector('.before-after-container');
      this.slider = this.querySelector('.before-after-slider');
      this.beforeContainer = this.querySelector('.image-banner--before');
      this.afterContainer = this.querySelector('.image-banner--after');
      this.beforeImageWrapper = this.beforeContainer.querySelectorAll('.image-banner__image-wrapper');
      this.beforeTextWrapper = this.beforeContainer.querySelector('.image-banner__text-wrapper');
      this.afterImageWrapper = this.afterContainer.querySelectorAll('.image-banner__image-wrapper');
      this.afterTextWrapper = this.afterContainer.querySelector('.image-banner__text-wrapper');
      
      this.isDragging = false;

      this.onMouseMoveHandler = this.onMouseMove.bind(this);
      this.onMouseUpHandler = this.onMouseUp.bind(this);
      this.onTouchMoveHandler = this.onTouchMove.bind(this);
      this.onTouchEndHandler = this.onMouseUp.bind(this);
    }

    connectedCallback() {
      const isMobile = window.matchMedia('(max-width: 749px)').matches;
  
      const initialRatio = isMobile ? 0.15 : 0.501;
      const containerRect = this.container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerLeft = containerRect.left;

      const initialClientX = containerLeft + (containerWidth * initialRatio);

      this.currentPosition = initialRatio * 100;

      this.initializeSlider();

      this.updateSliderPosition(initialClientX);
    }

    disconnectedCallback() {
      document.removeEventListener('mousemove', this.onMouseMoveHandler);
      document.removeEventListener('mouseup', this.onMouseUpHandler);
      document.removeEventListener('touchmove', this.onTouchMoveHandler);
      document.removeEventListener('touchend', this.onTouchEndHandler);
    }

    initializeSlider() {
      this.classList.add('is-loaded');

      this.slider.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        e.preventDefault();
      });

      this.slider.addEventListener('touchstart', (e) => {
        this.isDragging = true;
      }, { passive: true });

      document.addEventListener('mousemove', this.onMouseMoveHandler);
      document.addEventListener('mouseup', this.onMouseUpHandler);
      document.addEventListener('touchmove', this.onTouchMoveHandler, { passive: false });
      document.addEventListener('touchend', this.onTouchEndHandler);
    }

    onMouseMove(e) {
      if (!this.isDragging) {
        return;
      }

      this.updateSliderPosition(e.clientX);
    }

    onTouchMove(e) {
      if (!this.isDragging) {
        return;
      }

      this.updateSliderPosition(e.touches[0].clientX);
    }

    onMouseUp() {
      this.isDragging = false;
    }

    updateSliderPosition(clientX) {
      const containerRect = this.container.getBoundingClientRect();
      const position = (clientX - containerRect.left) / containerRect.width;
      const percentage = Math.max(0, Math.min(1, position)) * 100;

      this.currentPosition = percentage;
      this.slider.style.left = `${percentage}%`;

      if (percentage !== 50) {
        const beforeClipValue = `inset(0 ${100 - percentage}% 0 0)`;
        const afterClipValue = `inset(0 0 0 ${percentage}%)`;

        this.beforeImageWrapper.forEach((wrapper) => {
          wrapper.style.clipPath = beforeClipValue;
        });

        this.beforeTextWrapper.style.clipPath = beforeClipValue;

        this.afterImageWrapper.forEach((wrapper) => {
          wrapper.style.clipPath = afterClipValue;
        });

        this.afterTextWrapper.style.clipPath = afterClipValue;
        
      } else {
        const resetValue = 'none';

        this.beforeImageWrapper.forEach((wrapper) => {
          wrapper.style.clipPath = resetValue;
        });

        this.beforeTextWrapper.style.clipPath = resetValue;

        this.afterImageWrapper.forEach((wrapper) => {
          wrapper.style.clipPath = resetValue;
        });
        
        this.afterTextWrapper.style.clipPath = resetValue;
      }
    }
  }

  customElements.define('before-after', BeforeAfter);
}