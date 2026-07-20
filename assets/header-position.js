class StickyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.header = document.querySelector('.shopify-section-header');
    this.headerBounds = {};
    this.currentScrollTop = 0;
    this.preventReveal = false;
    this.predictiveSearch = this.querySelector('predictive-search');

    this.onScrollHandler = this.onScroll.bind(this);
    this.hideHeaderOnScrollUp = () => (this.preventReveal = true);

    this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
    window.addEventListener('scroll', this.onScrollHandler, false);

    this.createObserver();
  }

  disconnectedCallback() {
    this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  createObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
      this.headerBounds = entries[0].intersectionRect;
      observer.disconnect();
    });

    observer.observe(this.header);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (this.predictiveSearch && this.predictiveSearch.isOpen) return;

    if (
      scrollTop > this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      if (this.preventHide) return;
      requestAnimationFrame(this.hide.bind(this));
    } else if (
      scrollTop < this.currentScrollTop &&
      scrollTop > this.headerBounds.bottom
    ) {
      if (!this.preventReveal) {
        requestAnimationFrame(this.reveal.bind(this));
      } else {
        window.clearTimeout(this.isScrolling);

        this.isScrolling = setTimeout(() => {
          this.preventReveal = false;
        }, 66);

        requestAnimationFrame(this.hide.bind(this));
      }
    } else if (scrollTop <= this.headerBounds.top) {
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    this.header.classList.add(
      'shopify-section-header-hidden',
      'shopify-section-header-sticky',
    );
    this.closeMenuDisclosure();
    this.closeSearchModal();
  }

  reveal() {
    this.header.classList.add('shopify-section-header-sticky', 'animate-popup');
    this.header.classList.remove('shopify-section-header-hidden');
  }

  reset() {
    this.header.classList.remove(
      'shopify-section-header-hidden',
      'shopify-section-header-sticky',
      'animate-popup',
    );
  }

  closeMenuDisclosure() {
    this.disclosures =
      this.disclosures || this.header.querySelectorAll('header-menu');
    this.disclosures.forEach((disclosure) => disclosure.close());
  }

  closeSearchModal() {
    this.searchModal =
      this.searchModal || this.header.querySelector('details-modal');
    this.searchModal.close(false);
  }
}

customElements.define('sticky-header', StickyHeader);

class StaticHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.header = document.querySelector('.shopify-section-header');
    this.header.classList.add('shopify-section-header--relative');
  }
}

customElements.define('static-header', StaticHeader);

// Cache DOM elements to avoid repeated queries
let headerElement = null;
let announcementBarElement = null;
let headerMegaMenus = null;
let headerDropdownMenus = null;

// Initialize cached DOM elements early
function initializeDOMCache() {
  headerElement = document.querySelector('.header-wrapper');
  announcementBarElement = document.querySelector('.announcement-bar');
  headerMegaMenus = document.querySelectorAll('.header__mega-menu');
  headerDropdownMenus = document.querySelectorAll('.header__dropdown-menu');
}

function initializeHeaderPosition() {
  headerMegaMenus?.forEach((menuList) => {
    setHeaderOverflow(menuList)
  });

  headerDropdownMenus?.forEach((menuList) => {
    setHeaderOverflow(menuList);
  });
}

function setHeaderOverflow(menuList) {
  if (!window.navigationSize || typeof window.navigationSize.navOffsetStart === 'undefined') {
    return;
  }

  const menuHeight = menuList.scrollHeight;
  const headerOffset = window.navigationSize.navOffsetStart;

  if (menuList && window.innerHeight < menuHeight + headerOffset) {
    menuList.style.overflowY = 'auto';
  } else if (menuList) {
    menuList.style.overflowY = 'hidden';
  }
}

document.addEventListener('navigationSizeUpdated', initializeHeaderPosition);

function initializeUpdateNavigationSize() {
  // Elements are already cached, just proceed with setup
  // Use ResizeObserver if available, otherwise fallback to resize events
  if ('ResizeObserver' in window) {
    observeNavigationElements();
    // Also add resize event listener for cases ResizeObserver might miss
    window.addEventListener('resize', window.debounce(updateNavigationSize, 100));
  } else {
    updateNavigationSize();
    window.addEventListener('resize', window.debounce(updateNavigationSize, 100));
  }
}

function updateNavigationSize() {
  if (updateNavigationSize.isUpdating) return;
  updateNavigationSize.isUpdating = true;

  requestAnimationFrame(() => {
    const headerHeight = headerElement?.offsetHeight || 0;
    const announcementBarHeight = announcementBarElement?.offsetHeight || 0;
    const navOffsetStart = headerHeight + announcementBarHeight;

    // Update global state
    window.navigationSize = {
      headerHeight,
      announcementBarHeight,
      navOffsetStart,
    };

    // Set CSS custom properties
    const docEl = document.documentElement.style;
    docEl.setProperty('--header-height', `${headerHeight}px`);
    docEl.setProperty('--announcement-bar-height', `${announcementBarHeight}px`);
    docEl.setProperty('--nav-offset-start', `${navOffsetStart}px`);

    // Dispatch update event
    document.dispatchEvent(new CustomEvent('navigationSizeUpdated', {
      detail: {
        headerHeight,
        announcementBarHeight,
        navOffsetStart,
        isUpdated: true,
      },
    }));

    updateNavigationSize.isUpdating = false;
  });
}

function observeNavigationElements() {
  const elements = [headerElement, announcementBarElement].filter(Boolean);

  if (elements.length === 0) return;

  const resizeObserver = new ResizeObserver(() => {
    updateNavigationSize();
  });

  elements.forEach(element => resizeObserver.observe(element));

  // Initial calculation
  updateNavigationSize();
}

// Initialize DOM cache and setup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeDOMCache();
  initializeUpdateNavigationSize();
});

// Update on window load for more accurate measurements
window.addEventListener('load', updateNavigationSize);
