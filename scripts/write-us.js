const popupWriteUs = document.querySelector('.popup-write-us');
const popupWriteUForm = document.querySelector('.write-us__form');
const popupWriteUsSubmit = document.querySelector('.write-us__button-submit');
const popupWriteUsClose = document.querySelector('.popup-write-us__button-close');

const openPopupWriteUs = function (popupName) {
  popupName.classList.add('popup-write-us_opened');
};

popupWriteUForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  openPopupWriteUs(popupWriteUs);
});


popupWriteUsClose.addEventListener('click', function () {
  popupWriteUs.classList.remove('popup-write-us_opened')
});


