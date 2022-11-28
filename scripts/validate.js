const showInputError = (formElement,inputElement,errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-error_border_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement,inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-error_border_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement,inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement,inputElement);
  } else {
    showInputError(formElement,inputElement,inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableButton = (buttonElement) => {
  buttonElement.classList.add('popup__button_disabled');
  buttonElement.setAttribute('disabled',true);
}

const enableButton = (buttonElement) => {
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList,buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

const deleteSpan = () => {
  const spans = Array.from(document.querySelectorAll('.popup__input-error'));
  spans.forEach((element) => {
    element.classList.remove('popup__input-error_active');
  });
  const inputs = Array.from(document.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.classList.remove('popup__input-error_border_error');
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList,buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input',function () {
      checkInputValidity(formElement,inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});
