import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector,handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._btnSubmit = this._popup.querySelector('.popup__button');
  }

  // Метод собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._btnSubmit.textContent = 'Сохранение...';
    } else {
      this._btnSubmit.textContent = 'Сохранить';
    }
  }

}

export default PopupWithForm;
