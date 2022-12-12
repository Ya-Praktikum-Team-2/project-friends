const initPartners = () => {
  const scroller = document.querySelector('.partners__scroller');
  const buttonNext = document.querySelector('.partners__button_type_next');
  const buttonPrev = document.querySelector('.partners__button_type_prev');

  const checkScroller = () => {
    if (scroller.scrollLeft <= 10) {
      buttonPrev.classList.add('partners__button_type_hidden');
    } else {
      buttonPrev.classList.remove('partners__button_type_hidden');
    }
    if (Math.abs(scroller.scrollLeft + scroller.clientWidth - scroller.scrollWidth) <= 10) {
      buttonNext.classList.add('partners__button_type_hidden');
    } else {
      buttonNext.classList.remove('partners__button_type_hidden');
    }
  };

  const disableButtons = () => {
    if (scroller.scrollWidth <= scroller.clientWidth) {
      buttonPrev.classList.add('partners__button_type_hidden');
      buttonNext.classList.add('partners__button_type_hidden');
      return;
    }
    checkScroller();
  };

  scroller.addEventListener('scroll', checkScroller, { passive: true });
  window.addEventListener('resize', disableButtons, { passive: true });

  buttonNext.addEventListener('click', () => {
    scroller.scroll(scroller.scrollLeft + scroller.clientWidth / 2, 0);
  });

  buttonPrev.addEventListener('click', () => {
    scroller.scroll(Math.max(scroller.scrollLeft - scroller.clientWidth / 2, 0), 0);
  });

  disableButtons();
};

export default initPartners;
