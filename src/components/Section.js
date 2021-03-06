export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }

  renderItems() {
    Array.from(this._items).forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }
}
