if (!customElements.get('disclosure-list')) {
  customElements.define(
    'disclosure-list',
    class DisclosureList extends HTMLElement {
      static get observedAttributes() {
        return ['data-select', 'data-value'];
      }

      constructor() {
        super();
        // Bind methods to preserve 'this' context
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleItemKeyDown = this.handleItemKeyDown.bind(this);
        this.handleButtonKeyDown = this.handleButtonKeyDown.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
      }

      connectedCallback() {
        // Initialize element references - only query when connected to DOM
        this.input = this.querySelector('input[type="hidden"]');
        this.button = this.querySelector('button');
        this.panel = this.querySelector('ul');
        this.items = Array.from(this.querySelectorAll('li'));

        if (!this.input || !this.panel) return;

        // Set up button if it exists
        if (this.button) {
          this.button.addEventListener('click', this.handleButtonClick);
          this.button.addEventListener('keydown', this.handleButtonKeyDown);
          this.button.addEventListener('focusout', this.handleFocusOut);
          // Ensure initial ARIA state
          this.button.setAttribute('aria-expanded', 'false');
        }

        // Set up list items
        this.items.forEach((item, index) => {
          item.addEventListener('click', this.handleItemClick);
          item.addEventListener('keydown', this.handleItemKeyDown);
          // Make items focusable for keyboard navigation
          if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '-1');
          }
        });

        // Initialize display state
        this.updateSelector();
      }

      disconnectedCallback() {
        // Clean up event listeners to prevent memory leaks
        if (this.button) {
          this.button.removeEventListener('click', this.handleButtonClick);
          this.button.removeEventListener('keydown', this.handleButtonKeyDown);
          this.button.removeEventListener('focusout', this.handleFocusOut);
        }

        this.items.forEach((item) => {
          item.removeEventListener('click', this.handleItemClick);
          item.removeEventListener('keydown', this.handleItemKeyDown);
        });
      }

      attributeChangedCallback(name, oldValue, newValue) {
        // Only update if element is connected and attributes actually changed
        if (this.isConnected && oldValue !== newValue) {
          this.updateSelector();
        }
      }

      handleButtonClick() {
        this.togglePanel();
      }

      handleButtonKeyDown(event) {
        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            this.togglePanel();
            break;
          case 'Escape':
            this.closePanel();
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.openPanel();
            this.focusFirstItem();
            break;
        }
      }

      handleItemClick(event) {
        event.preventDefault();
        const clickedItem = event.currentTarget;
        this.selectItem(clickedItem);
      }

      handleItemKeyDown(event) {
        const currentIndex = this.items.indexOf(event.currentTarget);

        switch (event.key) {
          case 'Enter':
          case ' ':
            event.preventDefault();
            this.selectItem(event.currentTarget);
            break;
          case 'Escape':
            event.preventDefault();
            this.closePanel();
            if (this.button) {
              this.button.focus();
            }
            break;
          case 'ArrowDown':
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % this.items.length;
            this.items[nextIndex].focus();
            break;
          case 'ArrowUp':
            event.preventDefault();
            const prevIndex =
              currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
            this.items[prevIndex].focus();
            break;
          case 'Home':
            event.preventDefault();
            this.focusFirstItem();
            break;
          case 'End':
            event.preventDefault();
            this.focusLastItem();
            break;
        }
      }

      handleFocusOut(event) {
        // Don't close if focus is moving to an item within the panel
        if (event.relatedTarget && this.panel.contains(event.relatedTarget)) {
          return;
        }

        // Use setTimeout to allow click events to fire first
        setTimeout(() => {
          if (!this.contains(document.activeElement)) {
            this.closePanel();
          }
        }, 0);
      }

      togglePanel() {
        const isOpen = !this.panel.hasAttribute('hidden');
        if (isOpen) {
          this.closePanel();
        } else {
          this.openPanel();
        }
      }

      openPanel() {
        this.panel.removeAttribute('hidden');
        if (this.button) {
          this.button.setAttribute('aria-expanded', 'true');
        }
      }

      closePanel() {
        this.panel.setAttribute('hidden', '');
        if (this.button) {
          this.button.setAttribute('aria-expanded', 'false');
        }
      }

      selectItem(item) {
        // Find the element with data-value (could be the <li> itself or a child element)
        const dataElement = item.dataset.value
          ? item
          : item.querySelector('[data-value]');
        if (!dataElement) return;

        const value = dataElement.dataset.value;
        const content =
          dataElement.dataset.content || dataElement.textContent.trim();

        if (!value) return;

        // Update aria-current on all items
        this.items.forEach((listItem) => {
          listItem.removeAttribute('aria-current');
          const link = listItem.querySelector('[data-value]') || listItem;
          link.removeAttribute('aria-current');
        });

        item.setAttribute('aria-current', 'true');
        if (dataElement !== item) {
          dataElement.setAttribute('aria-current', 'true');
        }

        // Update hidden input value
        this.input.value = value;

        // Update button text if button exists
        if (this.button) {
          this.updateButtonText(content);
        }

        // Close panel
        this.closePanel();
      }

      updateButtonText(content) {
        if (!this.button) return;

        // Preserve icon if it exists
        const icon = this.button.querySelector('svg, .icon-caret');
        if (icon) {
          const iconHTML = icon.outerHTML;
          this.button.innerHTML = content + ' ' + iconHTML;
        } else {
          this.button.textContent = content;
        }
      }

      updateSelector() {
        // Refresh items array in case DOM changed
        this.items = Array.from(this.querySelectorAll('li'));

        // Find and highlight the currently selected item
        const currentItem = this.items.find(
          (item) => item.getAttribute('aria-current') === 'true',
        );
        if (currentItem && this.input) {
          const dataElement = currentItem.dataset.value
            ? currentItem
            : currentItem.querySelector('[data-value]');
          if (dataElement) {
            const value = dataElement.dataset.value;
            const content =
              dataElement.dataset.content || dataElement.textContent.trim();
            this.input.value = value;

            if (this.button) {
              this.updateButtonText(content);
            }
          }
        }
      }

      focusFirstItem() {
        if (this.items.length > 0) {
          this.items[0].focus();
        }
      }

      focusLastItem() {
        if (this.items.length > 0) {
          this.items[this.items.length - 1].focus();
        }
      }
    }
  );
}