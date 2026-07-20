document.addEventListener('shopify:block:select', function(event) {
  const target = event.target;

  if (target.classList.contains('embla__slide')) {
    const parentSlideshowComponent = target.closest('embla-component');
    const index = parseInt(target.dataset.slideIndex);
    parentSlideshowComponent.emblaApi.scrollTo(index);
  };

  if (target.classList.contains('videos-feed__post') || target.classList.contains('social-feed__post')) {
    const sectionId = event.detail.sectionId;
    const blockId = event.detail.blockId;
    const child = document.querySelector(`#ModalOpenerBtn-${blockId}`);
    const scrollContainer = document.querySelector(`.section-${sectionId} .marquee__align`);

    const scrollIntoViewHorizontally = (
      container,
      child,
    ) => {
      const child_offsetRight = child.offsetLeft + child.offsetWidth;
      const container_scrollRight = container.scrollLeft + container.offsetWidth;

      if (container.scrollLeft > child.offsetLeft) {
        container.scrollLeft = child.offsetLeft;
      } else if (container_scrollRight < child_offsetRight) {
        container.scrollLeft += child_offsetRight - container_scrollRight;
      }
    };

    scrollIntoViewHorizontally(scrollContainer, child);
  }
})
