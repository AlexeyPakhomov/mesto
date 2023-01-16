const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupPhoto = document.querySelector('.profile__add-button');
const inputAddNameProfile = document.querySelector('.popup__input_text_name');
const inputAddJobProfile = document.querySelector('.popup__input_text_job');
const formAddProfile = document.querySelector('.popup__form_block_profile');
const formAddPhoto = document.querySelector('.popup__form_block_photo');
const elementsTemplateContainer = '.elements__container';
const popups = document.querySelectorAll('.popup');

const selectorValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  spanSelector: '.popup__input-error',              // Добавлен селектор span для сброса ошибок
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

// Массив карточек Photo
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: 'https://images.unsplash.com/photo-1538819285938-6a9b4eda500b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'
  },
  {
    name: 'Горный Алтай',
    link: 'https://images.unsplash.com/photo-1559426756-14c161f0dae8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export { initialCards,buttonOpenPopupProfile,buttonOpenPopupPhoto,inputAddNameProfile,inputAddJobProfile,formAddProfile,formAddPhoto,elementsTemplateContainer,selectorValidation,popups };
