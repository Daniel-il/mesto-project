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
    this._cardImage = this._element.querySelector(".card__image");
    this._cardHeading = this._element.querySelector(".card__heading");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardLikeCount = this._element.querySelector(".card__likes-count");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardHeading.textContent = this._name;
    this._checkMyUserLike();
    this._getLikesCount();
    this._setEventListeners();
    this._generateBin();

    return this._element;
  }
  deleteCard() {
    this._deleteButton.closest(".card").remove();
  }
  likeCard() {
    this.isLiked = !this.isLiked;
    this._likeButton.classList.toggle("card__like-button_active");
  }
  _getLikesCount() {
    this._cardLikeCount.textContent = this._likes.length;
  }
  updateLikesCount(el) {
    const likes = el.likes;
    this._cardLikeCount.textContent = likes.length;
  }
  _checkMyUserLike() {
    if (this._likes.some((myUser) => myUser._id === this._user)) {
      this._likeButton.classList.add("card__like-button_active");
      this.isLiked = !this.isLiked;
    }
  }
  _setEventListeners() {
    this._cardImage.addEventListener("click", this._handleCardClick);
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
  }
  _generateBin() {
    if (this._owner === this._user) {
      this._deleteButton.classList.add("card__delete-button_enable");
    }
  }
}
