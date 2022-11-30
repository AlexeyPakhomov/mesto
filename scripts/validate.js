const selectorValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  spanSelector: '.popup__input-error',              // Добавлен селектор span для сброса ошибок
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

const deleteSpan = (selectorValidation) => {
  const inputs = Array.from(document.querySelectorAll(selectorValidation.inputSelector));
  inputs.forEach((element) => {
    element.classList.remove(selectorValidation.inputErrorClass);
  });
  const spans = Array.from(document.querySelectorAll(selectorValidation.spanSelector));
  spans.forEach((element) => {
    element.classList.remove(selectorValidation.errorClass);
    element.textContent = '';
  });
};

const showInputError = (formElement,inputElement,errorMessage,selectorValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorValidation.inputErrorClass);
  errorElement.classList.add(selectorValidation.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement,inputElement,selectorValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorValidation.inputErrorClass);
  errorElement.classList.remove(selectorValidation.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement,inputElement,selectorValidation) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement,inputElement,selectorValidation);
  } else {
    showInputError(formElement,inputElement,inputElement.validationMessage,selectorValidation);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
};

const disableButton = (buttonElement,selectorValidation) => {
  buttonElement.classList.add(selectorValidation.inactiveButtonClass);
  buttonElement.setAttribute('disabled',true);
}

const enableButton = (buttonElement,selectorValidation) => {
  buttonElement.classList.remove(selectorValidation.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList,buttonElement,selectorValidation) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement,selectorValidation);
  } else {
    enableButton(buttonElement,selectorValidation);
  }
}

const setEventListeners = (formElement,selectorValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorValidation.inputSelector));
  const buttonElement = formElement.querySelector(selectorValidation.submitButtonSelector);

  toggleButtonState(inputList,buttonElement,selectorValidation);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',function () {
      checkInputValidity(formElement,inputElement,selectorValidation);
      toggleButtonState(inputList,buttonElement,selectorValidation);
    });
  });
};

const enableValidation = (selectorValidation) => {
  const formList = Array.from(document.querySelectorAll(selectorValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement,selectorValidation);
  });
};

enableValidation(selectorValidation);
