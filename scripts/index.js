const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddPhoto = document.querySelector('.popup_type_photo');
const popupLargePhoto = document.querySelector('.popup_type_large-photo');
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
const templateAddCard = document.querySelector('#template-elements').content;
const largePhoto = document.querySelector('.popup__large-photo');
const captionLargePhoto = document.querySelector('.popup__figcaption');
const buttonSubmitProfile = popupProfile.querySelector('.popup__button')
const buttonSubmitPhoto = popupAddPhoto.querySelector('.popup__button')

const preloadAnimationCanceling = () => {
  popups.forEach((popup) => popup.classList.add('popup_animation'));
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',closeEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',closeEsc);
};

const openEditProfilePopup = () => {
  deleteSpan(selectorValidation);
  inputAddNameProfile.value = nameProfile.textContent;
  inputAddJobProfile.value = jobProfile.textContent;
  enableButton(buttonSubmitProfile,selectorValidation);
  openPopup(popupProfile);
};

const openAddPhotoPopup = () => {
  formAddPhoto.reset();
  deleteSpan(selectorValidation);
  disableButton(buttonSubmitPhoto,selectorValidation);
  openPopup(popupAddPhoto);
};

const openLargePhotoPopup = (evt) => {
  largePhoto.src = evt.target.src;
  largePhoto.alt = evt.target.alt;
  captionLargePhoto.textContent = evt.target.alt;
  openPopup(popupLargePhoto);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown',(event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon-img')) {
      closePopup(popup);
    }
  })
})

const closeEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
}

const submitFormHandlerProfile = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = inputAddNameProfile.value;
  jobProfile.textContent = inputAddJobProfile.value;
  closePopup(popupProfile);
};

const submitFormHandlerPhoto = (evt) => {
  evt.preventDefault();
  renderCard({ name: inputAddPlacePhoto.value,link: inputAddUrlPhoto.value })
  closePopup(popupAddPhoto);
  formAddPhoto.reset();
};

const handleDeleteCard = (evt) => {
  evt.target.closest('.elements__card').remove();
}

const handleLikeCard = (evt) => {
  evt.target.classList.toggle('elements__heart_active');
}

// Генерация карточки
const createCard = (card) => {
  const newCard = templateAddCard.querySelector('.elements__card').cloneNode(true);

  const title = newCard.querySelector('.elements__title');
  title.textContent = card.name;
  const img = newCard.querySelector('.elements__pic');
  img.src = card.link;
  img.alt = card.name
  img.addEventListener('click',openLargePhotoPopup)

  const deleteBtn = newCard.querySelector('.elements__recycle-bin');
  deleteBtn.addEventListener('click',handleDeleteCard);

  const likeBtn = newCard.querySelector('.elements__heart');
  likeBtn.addEventListener('click',handleLikeCard);

  return newCard;
};

// Добавление карточки
const renderCard = (name,img) => {
  elementsTemplateContainer.prepend(createCard(name,img));
};

// Рендер всех карточек
initialCards.forEach((name,img) => {
  renderCard(name,img);
});

formAddProfile.addEventListener('submit',submitFormHandlerProfile);
formAddPhoto.addEventListener('submit',submitFormHandlerPhoto);
buttonOpenPopupProfile.addEventListener('click',openEditProfilePopup);
buttonOpenPopupPhoto.addEventListener('click',openAddPhotoPopup);
window.addEventListener('DOMContentLoaded',preloadAnimationCanceling);
