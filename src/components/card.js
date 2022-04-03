import { cardForm } from "./modals";
import { addCardSubmitButton, apiConfig} from "./constants.js";
import Api from "./api.js";
import { renderLoading } from "./utils.js";

const api = new Api(apiConfig);
const popupImage = document.querySelector(".popup__image");
const placeNameInput = document.querySelector(".form__item_el_card-name");
const placeLinkInput = document.querySelector(".form__item_el_link");
const popupImageDescription = document.querySelector(".popup__image-description");
export default class Card {
  constructor({link, name, _id, likes, owner}, user, selector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._id = _id;
    this._likes = likes;
    this._user = user;
    this._selector = selector;
    this._owner = owner;
    this._handleCardClick = handleCardClick;
  }
  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.card')
    .cloneNode(true)
    return cardElement
  }
  generate() {
    this._element = this._getElement();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__heading').textContent = this._name;
    this._getLikesCount()
    this._setEventListeners();
    this._generateBin()

    return this._element
  }
  _deleteCard() {
    api
      .deleteCardFromServer(this._id)
      .then(() => {
        const deleteButton = this._element.querySelector('.card__delete-button')
        deleteButton.closest(".card").remove();
      })
      .catch((err) => console.log(err));
  }
  _likeCard() {
    const likeElement = this._element.querySelector('.card__like-button');
    const cardLikeCount = this._element.querySelector(".card__likes-count")
    if (likeElement.classList.contains("card__like-button_active")) {
      api
        .deleteLike(this._id)
        .then((el) => {
          const likes = el.likes;
          cardLikeCount.textContent = likes.length;
          likeElement.classList.remove("card__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      api
        .putLike(this._id)
        .then((el) => {
          const likes = el.likes;
          cardLikeCount.textContent = likes.length;
          likeElement.classList.add("card__like-button_active");
        })
        .catch((err) => console.log(err));
    }

  }
  _getLikesCount(){
    const cardLikeCount = this._element.querySelector(".card__likes-count");
    cardLikeCount.textContent = this._likes.length
    if (this._likes.some((myUser) => myUser._id === this._user)) {
      const likeButton = this._element.querySelector(".card__like-button")
      likeButton.classList.add("card__like-button_active");
    }
  }
  _setEventListeners() {
    const likeElement = this._element.querySelector('.card__like-button');
    const deleteElement = this._element.querySelector('.card__delete-button')
    const imageElement = this._element.querySelector(".card__image");
    imageElement.addEventListener("click", this._handleCardClick);
    likeElement.addEventListener('click', () => {
      this._likeCard()
    })
    deleteElement.addEventListener('click', () => {
      this._deleteCard(this._id)
    })
  }
  _generateBin() {
    if (this._owner === this._user) {
      const deleteButton = this._element.querySelector('.card__delete-button')
      deleteButton.classList.add("card__delete-button_enable");
    }
  }
}


