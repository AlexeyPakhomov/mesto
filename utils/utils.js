const popupLargePhoto = document.querySelector('.popup_type_large-photo');
const largePhoto = document.querySelector('.popup__large-photo');
const captionLargePhoto = document.querySelector('.popup__figcaption');

// Открытие popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closeEsc);
};

// Закрытие popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closeEsc);
};

// Закрытие popup через Esc
const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

export { popupLargePhoto,largePhoto,captionLargePhoto,openPopup,closePopup };
