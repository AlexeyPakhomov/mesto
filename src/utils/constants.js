const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupPhoto = document.querySelector('.profile__add-button');
const inputAddNameProfile = document.querySelector('.popup__input_text_name');
const inputAddJobProfile = document.querySelector('.popup__input_text_job');
const formAddProfile = document.querySelector('.popup__form_block_profile');
const formAddPhoto = document.querySelector('.popup__form_block_photo');
const elementsTemplateContainer = '.elements__container';
const popups = document.querySelectorAll('.popup');

const buttonOpenPopupAvatar = document.querySelector('.profile__edit-avatar');
const formEditAvatar = document.querySelector('.popup__form_block_avatar');

const selectorValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  spanSelector: '.popup__input-error',              // Добавлен селектор span для сброса ошибок
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

export { buttonOpenPopupProfile,buttonOpenPopupPhoto,inputAddNameProfile,inputAddJobProfile,formAddProfile,formAddPhoto,elementsTemplateContainer,selectorValidation,popups,buttonOpenPopupAvatar,formEditAvatar };
