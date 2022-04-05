export default class Card {
  constructor({ link, name, _id, likes, owner }, userId, { handleCardClick, handleDeleteClick, handleLikeClick }, selector) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._user = userId;
    this._selector = selector;
    this._owner = owner._id;
    this.isLiked = false;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  _getElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector(".card").cloneNode(true);
    return cardElement;
  }
  generate() {
    this._element = this._getElement();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__heading").textContent = this._name;
    this._checkMyUserLike();
    this._getLikesCount();
    this._setEventListeners();
    this._generateBin();

    return this._element;
  }
  deleteCard() {
    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.closest(".card").remove();
  }
  likeCard() {
    const likeElement = this._element.querySelector(".card__like-button");
    this.isLiked = !this.isLiked;
    likeElement.classList.toggle("card__like-button_active");
  }
  _getLikesCount() {
    const cardLikeCount = this._element.querySelector(".card__likes-count");
    cardLikeCount.textContent = this._likes.length;
  }
  updateLikesCount(el) {
    const cardLikeCount = this._element.querySelector(".card__likes-count");
    const likes = el.likes;
    cardLikeCount.textContent = likes.length;
  }
  _checkMyUserLike() {
    if (this._likes.some((myUser) => myUser._id === this._user)) {
      const likeButton = this._element.querySelector(".card__like-button");
      likeButton.classList.add("card__like-button_active");
      this.isLiked = !this.isLiked;
    }
  }
  _setEventListeners() {
    const likeElement = this._element.querySelector(".card__like-button");
    const deleteElement = this._element.querySelector(".card__delete-button");
    const imageElement = this._element.querySelector(".card__image");
    imageElement.addEventListener("click", this._handleCardClick);
    likeElement.addEventListener("click", this._handleLikeClick);
    deleteElement.addEventListener("click", this._handleDeleteClick);
  }
  _generateBin() {
    if (this._owner === this._user) {
      const deleteButton = this._element.querySelector(".card__delete-button");
      deleteButton.classList.add("card__delete-button_enable");
    }
  }
}
