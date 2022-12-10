const initWriteUs = () => {
  const popupWriteUs = document.querySelector('.popup-write-us');
  const popupWriteUForm = document.querySelector('.write-us__form');
  const popupWriteUsClose = document.querySelector('.popup-write-us__button-close');

  const openPopupWriteUs = (popupName) => {
    popupName.classList.add('popup-write-us_opened');
  };

  popupWriteUForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    openPopupWriteUs(popupWriteUs);
  });

  popupWriteUsClose.addEventListener('click', () => {
    popupWriteUs.classList.remove('popup-write-us_opened');
  });

  popupWriteUs.classList.remove('popup-write-us_uninited');
};

export default initWriteUs;
