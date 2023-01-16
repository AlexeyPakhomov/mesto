class Section {
  constructor({ items,renderer },containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  renderItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

  // Метод который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
