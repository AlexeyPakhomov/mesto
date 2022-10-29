let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-icon');
let popupContainer = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_job');
let profileName = document.querySelector('.profile__name');
let profileSpecialization = document.querySelector('.profile__specialization');
let formElement = document.querySelector('.popup__form');
let popupButton = document.querySelector('.popup__button');

function togglePopup() {
  popupContainer.classList.toggle('popup_opened');
  if (popupContainer.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSpecialization.textContent;
  };
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSpecialization.textContent = jobInput.value;
  togglePopup();
};

openPopup.addEventListener('click',togglePopup);
closePopup.addEventListener('click',togglePopup);
formElement.addEventListener('submit',formSubmitHandler);
