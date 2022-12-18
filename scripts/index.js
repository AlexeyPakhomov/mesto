import initialCards from './data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_photo');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupPhoto = document.querySelector('.profile__add-button');
const inputAddNameProfile = document.querySelector('.popup__input_text_name');
const inputAddJobProfile = document.querySelector('.popup__input_text_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__specialization');
const inputAddPlacePhoto = document.querySelector('.popup__input_text_place');
const inputAddUrlPhoto = document.querySelector('.popup__input_text_url');
const formAddProfile = document.querySelector('.popup__form_block_profile');
const formAddPhoto = document.querySelector('.popup__form_block_photo');
const elementsTemplateContainer = document.querySelector('.elements__container');
const popupLargePhoto = document.querySelector('.popup_type_large-photo');
const largePhoto = document.querySelector('.popup__large-photo');
const captionLargePhoto = document.querySelector('.popup__figcaption');

const selectorValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  spanSelector: '.popup__input-error',              // Добавлен селектор span для сброса ошибок
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

// Плавное открытие и закрытие popup
const preloadAnimationCanceling = () => {
  popups.forEach((popup) => popup.classList.add('popup_animation'));
};

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

// Выполняемые действия при открытии popup профиля
const openEditProfilePopup = () => {
  profileValidate._deleteSpan();
  inputAddNameProfile.value = nameProfile.textContent;
  inputAddJobProfile.value = jobProfile.textContent;
  profileValidate._enableButton();
  openPopup(popupProfile);
};

// Выполняемые действия при открытии popup добавления фото
const openAddPhotoPopup = () => {
  formAddPhoto.reset();
  photoValidate._deleteSpan();
  photoValidate._disableButton();
  openPopup(popupAddPhoto);
};

// Закрытие popup по кнопке или при нажатии на слой
popups.forEach((popup) => {
  popup.addEventListener('mousedown',(event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon-img')) {
      closePopup(popup);
    }
  });
});

// Закрытие popup через Esc
const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

// Сабмит popup профиля
const submitFormHandlerProfile = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = inputAddNameProfile.value;
  jobProfile.textContent = inputAddJobProfile.value;
  closePopup(popupProfile);
};

// Сабмит popup добавления фото
const submitFormHandlerPhoto = (evt) => {
  evt.preventDefault();
  renderCard(inputAddPlacePhoto.value,inputAddUrlPhoto.value);
  closePopup(popupAddPhoto);
  formAddPhoto.reset();
};

// Создаем экземпляр Card и добавляем в DOM
const renderCard = (name,link) => {
  const card = new Card(name,link);
  const elementCard = card.createCard();
  elementsTemplateContainer.prepend(elementCard);
};

// Загрузка карточек из массива
initialCards.forEach((item) => {
  renderCard(item.name,item.link);
});

// Создаем экземпляр FormValidator для каждой формы
const profileValidate = new FormValidator(selectorValidation,formAddProfile);
const photoValidate = new FormValidator(selectorValidation,formAddPhoto);

// Запускаем валидацию
profileValidate.enableValidation();
photoValidate.enableValidation();

// События и обработчики
formAddProfile.addEventListener('submit',submitFormHandlerProfile);
formAddPhoto.addEventListener('submit',submitFormHandlerPhoto);
buttonOpenPopupProfile.addEventListener('click',openEditProfilePopup);
buttonOpenPopupPhoto.addEventListener('click',openAddPhotoPopup);
window.addEventListener('DOMContentLoaded',preloadAnimationCanceling);


export { popupLargePhoto,largePhoto,captionLargePhoto,openPopup };
