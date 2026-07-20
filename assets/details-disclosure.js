class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');

    this.addEventListener('keyup', this.onKeyUp);

    if (this.mainDetailsToggle) this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if (!openDetailsElement) return;

    const summaryElement = openDetailsElement.querySelector('summary');
    openDetailsElement.removeAttribute('open');
    summaryElement.focus();
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  close() {
    if (this.mainDetailsToggle) this.mainDetailsToggle.removeAttribute('open')
  }
}

customElements.define('details-disclosure', DetailsDisclosure);


class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.addEventListener('click', this.closeAll);
  }

  closeAll(event) {
    const currentDetails = event.target.closest('details');

    const items = this.querySelectorAll('details')

    items.forEach((item) => {
      if (item === currentDetails) { return }

      if(item.hasAttribute('open')) {
        item.removeAttribute('open')
      }
    });
  }
}

customElements.define('header-menu', HeaderMenu);

class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.summary = this.querySelector('summary');
    this.details = this.querySelector('details');
    this.init();
  }

  init() {
    this.summary.addEventListener('click', (e) => {
      if (this.details.hasAttribute('open')) {
        // stop the default behavior
        e.preventDefault();
        // add a class which applies the animation in CSS
        this.details.classList.add('is-closing');
      }
    });

    this.details.addEventListener('animationend', (e) => {
      if (e.animationName === 'closeDetails') {
        this.details.removeAttribute('open');
        this.details.classList.remove('is-closing');
      }
    });
  }
}

customElements.define('accordion-item', AccordionItem);
