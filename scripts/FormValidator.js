class FormValidator {
  constructor(selectorValidation,formElement) {
    this._formSelector = selectorValidation.formSelector;
    this._inputSelector = selectorValidation.inputSelector;
    this._submitButtonSelector = selectorValidation.submitButtonSelector;
    this._spanSelector = selectorValidation.spanSelector;
    this._inactiveButtonClass = selectorValidation.inactiveButtonClass;
    this._inputErrorClass = selectorValidation.inputErrorClass;
    this._errorClass = selectorValidation.errorClass;

    this._formElement = formElement;

    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._spans = Array.from(this._formElement.querySelectorAll(this._spanSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Удаляем ошибки если закрыть popup без сохранения с ошибками
  _deleteSpan() {
    this._inputs.forEach((element) => {
      element.classList.remove(this._inputErrorClass);
    });
    this._spans.forEach((element) => {
      element.classList.remove(this._errorClass);
      element.textContent = '';
    });
  }

  // Связываем инпут с ошибкой и показываем её
  _showInputError(inputElement,errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  // Скрываем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  // Проверяем валидность инпута
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement,inputElement.validationMessage);
    }
  }

  // Проверяем одновременную валидность инпутов с помощью метода some
  _hasInvalidInput() {
    return this._inputs.some(inputElement => !inputElement.validity.valid);
  }

  // Отключение кнопки "Сохранить"
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled',true);
  }

  // Включение кнопки "Сохранить"
  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  // Переключатель для кнопки "Сохранить"
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // Добавляем обработчики всем инпутам формы
  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input',() => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Добавляем обработчики всем формам
  enableValidation() {
    this._formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
