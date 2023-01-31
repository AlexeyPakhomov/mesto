class Section {
  constructor({ renderer },containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  renderItems(items) {
    items.forEach((element) => {
      this._renderer(element);
    });
  }

  // Метод который принимает DOM-элемент и добавляет его в контейнер
  addItemAppend(element) {
    this._container.append(element);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }
}

export default Section;
