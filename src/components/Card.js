class Card {
  constructor({ data,userId,handleCardClick,handleDeleteCard,handlePutLike,handleDeleteLike },templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idPic = data._id;     // индивидуальный id карточки
    this._ownerId = data.owner._id; // f4a5c7773c8c0bcec2d8921e
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;

    this._templateSelector = templateSelector;

    this._element = this._getTemplate();
    this._pic = this._element.querySelector('.elements__pic');
    this._picTitle = this._element.querySelector('.elements__title');
    this._recycleBin = this._element.querySelector('.elements__recycle-bin');
    this._likeCard = this._element.querySelector('.elements__heart');
    this._likesCounter = this._element.querySelector('.elements__like-number');
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
    this.checkDeleteCard();
    this._likesCounter.textContent = this._likes.length;
    this._checkLike();

    return this._element;
  }

  // События и обработчики для методов Card
  _setEventListener() {
    this._pic.addEventListener('click',() => {
      this._handleCardClick(this._name,this._link);
    });

    this._recycleBin.addEventListener('click',() => {
      this._handleDeleteCard(this);
    });

    this._likeCard.addEventListener('click',() => {
      if (this._likeCard.classList.contains('elements__heart_active')) {
        this._handleDeleteLike(this._idPic);
      } else {
        this._handlePutLike(this._idPic);
      }
    });
  }

  // Удаление карточки
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  getId() {
    return this._idPic;
  }

  deleteLike(data) {
    this._likes = data.likes;
    this._likeCard.classList.remove('elements__heart_active');
    this._likesCounter.textContent = this._likes.length;
  }

  addLike(data) {
    this._likes = data.likes;
    this._likeCard.classList.add('elements__heart_active');
    this._likesCounter.textContent = this._likes.length;
  }

  // Проверяем наличие лайка
  _checkLike() {
    if (this._likes.some((like) => {
      return this._userId === like._id;
    })) {
      this._likeCard.classList.add('elements__heart_active');
    }
  }

  // Удаляем корзины у чужих карточек
  checkDeleteCard() {
    if (this._ownerId !== this._userId) {
      this._recycleBin.remove();
    }
  }

}

export default Card;
