import {
  initialCards,
  buttonOpenPopupProfile,
  buttonOpenPopupPhoto,
  inputAddNameProfile,
  inputAddJobProfile,
  formAddProfile,
  formAddPhoto,
  elementsTemplateContainer,
  selectorValidation,
  popups
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// Создаем экземпляр Card
const renderCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: (name,link) => {
      popupLargePhoto.open(name,link);
    }
  },'#template-elements');
  const elementCard = card.createCard();
  return elementCard;
};

// Отрисовка элементов на странице
const cardList = new Section({
  items: initialCards,
  renderer: (card) => {
    cardList.addItem(renderCard(card));
  },
},elementsTemplateContainer);
cardList.renderItems();

// Создаем экземпляр попап большого фото
const popupLargePhoto = new PopupWithImage('.popup_type_large-photo');
popupLargePhoto.setEventListeners();

// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
const userInfo = new UserInfo('.profile__name','.profile__specialization');

// Редактирование попап профиля и отображение значений инпутов на странице
const formEditUser = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name,specialization: data.specialization });
    formEditUser.close();
  }
});

formEditUser.setEventListeners();

// Слушатель с открытием попап профиля, отображение в инпутах значений со страницы, включение кнопки "Сохранить" и удаление ошибок валидатора
buttonOpenPopupProfile.addEventListener('click',() => {
  const contentUser = userInfo.getUserInfo();
  inputAddNameProfile.value = contentUser.nameUser;
  inputAddJobProfile.value = contentUser.specializationUser;
  formEditUser.open();
  profileValidate.enableButton();
  profileValidate.removeValidationErrors();
});

// Создание попапа с формой добавления новой карточки
const formAddCardPhoto = new PopupWithForm({
  popupSelector: '.popup_type_photo',
  handleFormSubmit: (data) => {
    cardList.addItem(renderCard({ name: data.place,link: data.url }));
    formAddCardPhoto.close();
  }
});

formAddCardPhoto.setEventListeners();

buttonOpenPopupPhoto.addEventListener('click',() => {
  formAddCardPhoto.open();
  photoValidate.removeValidationErrors();
});

// Создаем экземпляр FormValidator для каждой формы
const profileValidate = new FormValidator(selectorValidation,formAddProfile);
profileValidate.enableValidation();
const photoValidate = new FormValidator(selectorValidation,formAddPhoto);
photoValidate.enableValidation();

// Плавное открытие и закрытие popup
const preloadAnimationCanceling = () => {
  popups.forEach((popup) => popup.classList.add('popup_animation'));
};

window.addEventListener('DOMContentLoaded',preloadAnimationCanceling);
