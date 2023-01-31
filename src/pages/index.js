import './index.css';

import {
  buttonOpenPopupProfile,
  buttonOpenPopupPhoto,
  inputAddNameProfile,
  inputAddJobProfile,
  formAddProfile,
  formAddPhoto,
  elementsTemplateContainer,
  selectorValidation,
  popups,
  buttonOpenPopupAvatar,
  formEditAvatar,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
const userInfo = new UserInfo('.profile__name','.profile__specialization','.profile__avatar');
// Создаем экземпляр попап большого фото
const popupLargePhoto = new PopupWithImage('.popup_type_large-photo');
// Создаем экземпляр попап удаления карточки
const popupConfirm = new PopupWithConfirmation('.popup_type_confirm');

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58/',
  headers: {
    authorization: '8ec07323-384f-4707-a5b9-b183fdd7d129',
    'Content-type': 'application/json'
  }
});

let userId;

Promise.all([api.getUserInfo(),api.getAllCards()])
  .then(([userData,cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => console.log(`Ошибка получения данных: ${err}`));

// Создаем экземпляр Card
const renderCard = (data) => {
  const card = new Card({
    data,
    userId: userId,
    handleCardClick: (name,link) => {
      popupLargePhoto.open(name,link);
    },
    handleDeleteCard: (card) => {
      popupConfirm.open();
      popupConfirm.submitCallback(() => {
        api
          .deleteCard(card.getId())
          .then(() => {
            card.handleDeleteCard();
            popupConfirm.close();
          })
          .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
      });
    },
    handlePutLike: (id) => {
      api
        .addLike(id)
        .then((res) => card.addLike(res))
        .catch((err) => console.log(`Ошибка при добавлении лайка: ${err}`));
    },
    handleDeleteLike: (id) => {
      api
        .deleteLike(id)
        .then((res) => card.deleteLike(res))
        .catch((err) => console.log(`Ошибка при удалении лайка: ${err}`));
    },
  },'#template-elements');
  const elementCard = card.createCard();
  return elementCard;
};

// Отрисовка элементов на странице
const cardList = new Section({
  renderer: (card) => {
    cardList.addItemAppend(renderCard(card));
  },
},elementsTemplateContainer);

// Редактирование попап профиля и отображение значений инпутов на странице
const formEditUser = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: ((data) => {
    formEditUser.renderLoading(true);
    api.
      editProfile(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        formEditUser.close();
      })
      .catch((err) => console.log(`Ошибка редактирования данных пользователя: ${err}`))

      .finally(() => {
        formEditUser.renderLoading(false);
      });
  })
});

// Слушатель с открытием попап профиля, отображение в инпутах значений со страницы, включение кнопки "Сохранить" и удаление ошибок валидатора
buttonOpenPopupProfile.addEventListener('click',() => {
  const contentUser = userInfo.getUserInfo();
  inputAddNameProfile.value = contentUser.nameUser;
  inputAddJobProfile.value = contentUser.specializationUser;
  formEditUser.open();
  profileValidate.enableButton();
  profileValidate.removeValidationErrors();
});

// Создание попапа с формой редактирования авы
const formAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: ((data) => {
    formAvatar.renderLoading(true);
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        formAvatar.close();
      })
      .catch((err) => console.log(`Ошибка при редактировании аватарки: ${err}`))

      .finally(() => {
        formAvatar.renderLoading(false);
      });
  })
});

buttonOpenPopupAvatar.addEventListener('click',() => {
  formAvatar.open();
  avatarValidate.removeValidationErrors();
});

// Создание попапа с формой добавления новой карточки
const formAddCardPhoto = new PopupWithForm({
  popupSelector: '.popup_type_photo',
  handleFormSubmit: ((data) => {
    formAddCardPhoto.renderLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        cardList.addItemPrepend(renderCard(res));
        formAddCardPhoto.close();
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`))

      .finally(() => {
        formAddCardPhoto.renderLoading(false);
      });
  })
});

buttonOpenPopupPhoto.addEventListener('click',() => {
  formAddCardPhoto.open();
  photoValidate.removeValidationErrors();
  photoValidate.disableButton();
});

formEditUser.setEventListeners();
formAddCardPhoto.setEventListeners();
popupLargePhoto.setEventListeners();
popupConfirm.setEventListeners();
formAvatar.setEventListeners();

// Создаем экземпляр FormValidator для каждой формы
const profileValidate = new FormValidator(selectorValidation,formAddProfile);
profileValidate.enableValidation();
const photoValidate = new FormValidator(selectorValidation,formAddPhoto);
photoValidate.enableValidation();
const avatarValidate = new FormValidator(selectorValidation,formEditAvatar);
avatarValidate.enableValidation();

// Плавное открытие и закрытие popup
const preloadAnimationCanceling = () => {
  popups.forEach((popup) => popup.classList.add('popup_animation'));
};

window.addEventListener('DOMContentLoaded',preloadAnimationCanceling);
