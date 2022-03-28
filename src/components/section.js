export default class Section {
    constructor({items, renderer}, selector) {
        this._items =  items
        this._renderer = renderer;
        this._container = selector;
    }
    addItem(element) {
        this._container.append(element)
    }
    renderItems(items) {
        Array.from(items).forEach((item) => {
          this._renderer(item);
        });
      }
}