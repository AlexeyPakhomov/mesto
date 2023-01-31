import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',(evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  submitCallback(remove) {
    this._handleSubmitCallback = remove;
  }

}

export default PopupWithConfirmation;
