if (!customElements.get('countdown-timer')) {
  class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      this.countdownDate = new Date(this.dataset.countdownDate).getTime();
      this.hideAfterCompletion = this.dataset.hideAfter === 'true';
    }

    connectedCallback() {
      this.daysElement = this.querySelector('[data-days]');
      this.hoursElement = this.querySelector('[data-hours]');
      this.minutesElement = this.querySelector('[data-minutes]');
      this.secondsElement = this.querySelector('[data-seconds]');
      this.wrapper = this.closest('.countdown-container');
      this.postCountdown = this.wrapper?.querySelectorAll('.js-countdown-post');
      this.preCountdown = this.wrapper?.querySelectorAll('.js-countdown-pre');

      this.updateTimer();
      this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    disconnectedCallback() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    }

    updateTimer() {
      const now = new Date().getTime();
      const distance = this.countdownDate - now;

      if (distance < 0) {
        this.handleCountdownEnd();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.daysElement.textContent = this.padNumber(days);
      this.hoursElement.textContent = this.padNumber(hours);
      this.minutesElement.textContent = this.padNumber(minutes);
      this.secondsElement.textContent = this.padNumber(seconds);
    }

    handleCountdownEnd() {
      if (this.hideAfterCompletion) {
        this.style.display = 'none';
      }

      // Show post-countdown content within the wrapper scope
      if (this.wrapper) {
        if (this.preCountdown) {
          this.preCountdown.forEach((el) => el.classList.add('hidden'));
        }

        if (this.postCountdown) {
          this.postCountdown.forEach((el) => el.classList.remove('hidden'));
        }
      }

      this.disconnectedCallback();
    }

    padNumber(number) {
      return number.toString().padStart(2, '0');
    }
  }

  // Register the custom element only if it hasn't been registered before
  customElements.define('countdown-timer', CountdownTimer);
}
