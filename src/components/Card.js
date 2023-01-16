class Card {
  constructor({ data,handleCardClick },templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate();
    this._pic = this._element.querySelector('.elements__pic');
    this._picTitle = this._element.querySelector('.elements__title');
  }

  // Забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector).content
      .querySelector('.elements__card').cloneNode(true);

    return elementCard;
  }

  // Записываем разметку в приватное поле _element, добавляем данные и возвращаем.
  createCard() {
    this._setEventListener();
    this._pic.src = this._link;
    this._pic.alt = this._name;
    this._picTitle.textContent = this._name;
    return this._element;
  }

  // События и обработчики для методов Card
  _setEventListener() {
    this._pic.addEventListener('click',() => {
      this._handleCardClick(this._name,this._link);
    });

    this._element.querySelector('.elements__recycle-bin').addEventListener('click',() => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__heart').addEventListener('click',() => {
      this._handleLikeCard();
    });
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Лайк карточки
  _handleLikeCard() {
    this._element.querySelector('.elements__heart').classList.toggle('elements__heart_active');
  }
}

export default Card;
