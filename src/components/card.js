import { cardForm } from "./modals";
import { addCardSubmitButton, apiConfig } from "./constants.js";
import Api from "./api.js";
import { renderLoading } from "./utils.js";
const api = new Api(apiConfig);
const placeNameInput = document.querySelector(".form__item_el_card-name");
const placeLinkInput = document.querySelector(".form__item_el_link");
export default class Card {
  constructor({ link, name, _id, likes, owner, user, handleCardClick, handleDeleteClick, handleLikeClick}, selector) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._user = user;
    this._selector = selector;
    this._owner = owner;
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
    likeElement.classList.toggle('card__like-button_active');
  }
  _getLikesCount() {
    const cardLikeCount = this._element.querySelector(".card__likes-count");
    cardLikeCount.textContent = this._likes.length;
  }
  updateLikesCount(el) {
    const cardLikeCount = this._element.querySelector(".card__likes-count");
    const likes = el.likes
    cardLikeCount.textContent = likes.length;

  }
  _checkMyUserLike() {
    if (this._likes.some((myUser) => myUser._id === this._user)) {
      const likeButton = this._element.querySelector(".card__like-button");
      likeButton.classList.add("card__like-button_active");
      this.isLiked = !this.isLiked
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

export function submitFormAddCard(event) {
  renderLoading(true, cardForm, "Создание...");
  event.preventDefault();
  api
    .sendCard(placeNameInput.value, placeLinkInput.value)
    .then((res) => {
      cardsList.prepend(addCard(res, res.owner._id));
      closePopup(popupTypeAddCard);
      addCardSubmitButton.classList.add("form__submit-button_inactive");
      addCardSubmitButton.disabled = true;
      event.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardForm, "Создать"));
}
