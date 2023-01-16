import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__large-photo');
    this._popupCaption = this._popup.querySelector('.popup__figcaption');
  }

  open(name,link) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
