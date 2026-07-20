if (!customElements.get('signup-modal')) {
  customElements.define('signup-modal', class SignupModal extends ModalDialog {
    constructor() {
      super();
      this.delay = this.returnDelay();

      if (window.designMode.enabled !== 'true') {
        this.checkSubmission()
      } else {
        this.addEventListeners();
      }
    }

    /**
     * Check if the form has been submitted
     * This is checking for the URL param ?customer_posted=true
     */
    checkSubmission() {
      const name = 'customer_posted'
      const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

      if (results === null) {
        this.checkCookie();
        return;
      }

      const resultsSplit = results[1] || 0;

      if (resultsSplit === 'true') {
        setCookie('signup-modal-closed', 'true', 340);
        sessionStorage.setItem('signup-modal-closed', 'true');
        this.successMessage();
      } else {
        this.checkCookie();
      }
    }

    /**
     * Check if the cookie has been set
     * If it hasn't been set, show the modal
     */
    checkCookie() {
      if (getCookie('signup-modal-closed') !== 'true' && sessionStorage.getItem('signup-modal-closed') !== 'true') {
        setTimeout(() => {
          this.show();
        }, this.delay);
      }
    }

    returnDelay() {
      const delay = parseInt(this.dataset.delay);
      if (delay => 0) {
        return delay;
      } else {
        return 9000;
      }
    }

    successMessage() {
      const items = document.querySelectorAll('.js-sign-up-success')

      items.forEach((item) => {
        item.classList.add('is-hidden');
      });
    }

    hide() {
      super.hide();
    }

    show(opener) {
      super.show(opener);
      setCookie('signup-modal-closed', 'true', 30);
      sessionStorage.setItem('signup-modal-closed', 'true');
    }

    /**
     * This is for the theme editor
     * This will display the modal when the user is editing the section
     */
    addEventListeners() {
      document.addEventListener('shopify:section:select', (event) => {
        this.hide();
        const id = event.detail.sectionId;
        if(id != "sign-up-modal") { return; }
        const opener = `#SignupModal-${id} button`;
        this.show(opener);
      })

      document.addEventListener('shopify:section:deselect', (event) => {
        this.hide();
      })
    }
  });
}
