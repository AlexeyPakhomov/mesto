class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод отвечает за открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose);
  }

  // Метод отвечает за закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',this._handleEscClose);
  }

  // Логика закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  // Слушатель с логикой закрытия попапа.
  setEventListeners() {
    this._popup.addEventListener('mousedown',(event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon-img')) {
        this.close();
      }
    });
  }
}

export default Popup;
