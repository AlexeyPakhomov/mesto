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
// Popup Profile
const popupContainerProfile = document.querySelector('.popup_type_profile');
const openPopupProfile = document.querySelector('.profile__edit-button');
const closePopupProfile = document.querySelector('.popup__close-icon_block_profile');
const nameInputProfile = document.querySelector('.popup__input_text_name');
const jobInputProfile = document.querySelector('.popup__input_text_job');
const NameProfile = document.querySelector('.profile__name');
const SpecializationProfile = document.querySelector('.profile__specialization');
const formProfile = document.querySelector('.popup__form_block_profile');
// Popup AddPhoto
const popupContainerAddPhoto = document.querySelector('.popup_type_photo');
const openPopupAddPhoto = document.querySelector('.profile__add-button');
const closePopupAddPhoto = document.querySelector('.popup__close-icon_block_photo');
// template Сard
const elementsContainer = document.querySelector('.elements__container');
const templateCard = document.querySelector('#template-elements').content;
const placeInputPhoto = document.querySelector('.popup__input_text_place');
const urlPhoto = document.querySelector('.popup__input_text_url');
const formPhoto = document.querySelector('.popup__form_block_photo');
// Popup LargePhoto
const popupLargePhoto = document.querySelector('.popup_type_large-photo');
const closePopupLargePhoto = document.querySelector('.popup__close-icon_block_large-photo');
const largePhoto = document.querySelector('.popup__large-photo');
const caption = document.querySelector('.popup__figcaption');

// Открытие и закрытие всех popup
const togglePopupProfile = () => {
  popupContainerProfile.classList.toggle('popup_opened')
  if (popupContainerProfile.classList.contains('popup_opened')) {
    nameInputProfile.value = NameProfile.textContent;
    jobInputProfile.value = SpecializationProfile.textContent;
  };
};

const togglePopupAddPhoto = () => {
  popupContainerAddPhoto.classList.toggle('popup_opened')
};

const togglePopupLargePhoto = () => {
  popupLargePhoto.classList.toggle('popup_opened')
};

// Кнопки submit
const formSubmitHandlerProfile = (evt) => {
  evt.preventDefault();
  NameProfile.textContent = nameInputProfile.value;
  SpecializationProfile.textContent = jobInputProfile.value;
  togglePopupProfile();
  console.log('Данные профиля обновлены')
};

const formSubmitHandlerPhoto = (evt) => {
  evt.preventDefault();
  renderCard({ name: placeInputPhoto.value,link: urlPhoto.value })
  placeInputPhoto.value = '';
  urlPhoto.value = '';
  togglePopupAddPhoto();
  console.log('Фото отправлено');
};

// Генерация карточки
const createCard = (card) => {
  const newCard = templateCard.querySelector('.elements__card').cloneNode('true');
  const title = newCard.querySelector('.elements__title');
  title.textContent = card.name;
  const link = newCard.querySelector('.elements__pic');
  link.src = card.link;

  const deleteBtn = newCard.querySelector('.elements__recycle-bin');
  deleteBtn.addEventListener('click',(evt) => evt.target.closest('.elements__card').remove());

  const likeBtn = newCard.querySelector('.elements__heart');
  likeBtn.addEventListener('click',(evt) => evt.target.classList.toggle('elements__heart_active'));

  const LargePhoto = newCard.querySelector('.elements__pic');
  LargePhoto.addEventListener('click',(evt) => {
    togglePopupLargePhoto();
    if (popupLargePhoto.classList.contains('popup_opened')) {
      largePhoto.src = link.src;
      caption.textContent = title.textContent;
    };
  });

  return newCard;
};

// Добавление карточки
const renderCard = (name,link) => {
  elementsContainer.prepend(createCard(name,link));
};

// Рендер всех карточек
initialCards.forEach((name,link) => {
  renderCard(name,link);
});

// Слушатели
openPopupProfile.addEventListener('click',togglePopupProfile);
closePopupProfile.addEventListener('click',togglePopupProfile);
openPopupAddPhoto.addEventListener('click',togglePopupAddPhoto);
closePopupAddPhoto.addEventListener('click',togglePopupAddPhoto);
closePopupLargePhoto.addEventListener('click',togglePopupLargePhoto);
formProfile.addEventListener('submit',formSubmitHandlerProfile);
formPhoto.addEventListener('submit',formSubmitHandlerPhoto);
