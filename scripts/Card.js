import { openPopup,popupLargePhoto,largePhoto,captionLargePhoto } from '../utils/utils.js';

class Card {
  constructor(name,link,templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;

    this._element = this._getTemplate();

    this._picTitle = this._element.querySelector('.elements__title');
    this._pic = this._element.querySelector('.elements__pic');
  }

  // Забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector).content
      .querySelector('.elements__card').cloneNode(true);

    return elementCard;
  }

  // События и обработчики для методов Card
  _setEventListener() {
    this._pic.addEventListener('click',() => {
      this._openLargePhotoPopup();
    });

    this._element.querySelector('.elements__recycle-bin').addEventListener('click',() => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__heart').addEventListener('click',() => {
      this._handleLikeCard();
    });
  }

  // Открытие popup c фото
  _openLargePhotoPopup() {
    largePhoto.src = this._link;
    largePhoto.alt = this._caption;
    captionLargePhoto.textContent = this._name;
    openPopup(popupLargePhoto);
  }

  // Удаление карточки
  _handleDeleteCard() {
    this._element.remove();
  }

  // Лайк карточки
  _handleLikeCard() {
    this._element.querySelector('.elements__heart').classList.toggle('elements__heart_active');
  }

  // Записываем разметку в приватное поле _element, добавляем данные и возвращаем.
  createCard() {
    this._setEventListener();
    this._picTitle.textContent = this._name;
    this._pic.src = this._link;
    this._pic.alt = this._caption;


    return this._element;
  }
}

export default Card;
