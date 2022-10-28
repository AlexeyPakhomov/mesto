// Открытие и закрытие popup

let openPopup = document.querySelector('.profile__edit-button');
let closePopup = document.querySelector('.popup__close-icon');
let popupContainer = document.querySelector('.popup');

function togglePopup() {
  popupContainer.classList.toggle('popup_opened');
};

openPopup.addEventListener('click',togglePopup);
closePopup.addEventListener('click',togglePopup);

popupContainer.addEventListener('click',function () {
  if (event.target === event.currentTarget) {
    popupContainer.classList.toggle('popup_opened');
  }
});

// Дублируем текст в inputName и Specialization
let nameInput = document.querySelector('[name="name"]');
let jobInput = document.querySelector('[name="specialization"]');
let profileName = document.querySelector('.profile__name');
let profileSpecialization = document.querySelector('.profile__specialization');

nameInput.value = profileName.textContent;
jobInput.value = profileSpecialization.textContent;

// Редактирование имени и информации о себе

let formElement = document.querySelector('[name="formPopup"]');
let popupButton = document.querySelector('.popup__button');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSpecialization.textContent = jobInput.value;
};

formElement.addEventListener('submit',formSubmitHandler);
popupButton.addEventListener('click',togglePopup);
