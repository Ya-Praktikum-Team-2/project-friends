let offset = 0
const partnersSliderLine = document.querySelector('.partners__slider-line');
const buttonNext = document.querySelector('.partners__button-right');
const buttonPrev = document.querySelector('.partners__button-left');

buttonNext.addEventListener('click', function() {
  offset += 362;
  if (offset >= 943) {
    offset = 943;
    buttonNext.classList.add('partners_hidden');
  }
  partnersSliderLine.style.left = -offset + 'px';
  if (offset >= 0) {
    buttonPrev.classList.remove('partners_hidden');
  }
});

buttonPrev.addEventListener('click', function() {
  offset -= 362;
  if (offset <= 0) {
    offset = 0;
    buttonPrev.classList.add('partners_hidden');
  }
  partnersSliderLine.style.left = -offset + 'px';
  if (offset <= 943) {
    buttonNext.classList.remove('partners_hidden');
  }
});
