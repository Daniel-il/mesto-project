import { closePopup, openPopup } from "./modals";
import {
  addCardSubmitButton,
  popupTypeAddCard,
  popupTypeImage,
} from "./constants.js";
import { sendCard, getUserId, deleteCardFromServer, deleteLike, putLike, getLikesCount} from "./api";
const popupImage = document.querySelector(".popup__image");
const placeNameInput = document.querySelector(".form__item_el_card-name");
const placeLinkInput = document.querySelector(".form__item_el_link");
const popupImageDescription = document.querySelector(
  ".popup__image-description"
);
export const cardsList = document.querySelector(".cards__list");

export function addCard(el) {
  const cardTemplate = document.querySelector("#card-adding").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  getUserId()
  .then((user) => {
    const cardHeading = cardElement.querySelector(".card__heading");
    const cardImg = cardElement.querySelector(".card__image");
    cardHeading.textContent = el.name;
    cardImg.alt = el.name;
    cardImg.src = el.link;
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);
    function deleteCard() {
      deleteButton.closest(".card").remove();
      deleteCardFromServer(el._id)
    }
    const likeButton = cardElement.querySelector(".card__like-button");
    function likeCard() {
      if (likeButton.classList.contains('card__like-button_active')) {
        deleteLike(el._id)
        likeButton.classList.remove("card__like-button_active");
      }
      else { 
      likeButton.classList.add("card__like-button_active");
      putLike(el._id)}
    }
    likeButton.addEventListener("mousedown", likeCard);
    const cardLikeCount = cardElement.querySelector('.card__likes-count')
    getLikesCount()
    .then(() => {
      const likes = el.likes
      cardLikeCount.textContent = likes.length
    })
    function openPopupImage() {
      popupImage.src = cardImg.src;
      popupImage.alt = cardImg.alt;
      popupImageDescription.textContent = cardHeading.textContent;
      openPopup(popupTypeImage);
    }
    cardImg.addEventListener("click", openPopupImage);
    if (el.owner._id === user._id) {
      deleteButton.classList.add('card__delete-button_enable')
     
    }

  })
  return cardElement;
}
 

export function submitFormAddCard(event) {
  event.preventDefault();
  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;
  sendCard({
    name: card.name,
    link: card.link,
  });
  cardsList.prepend(addCard(card));
  closePopup(popupTypeAddCard);
  addCardSubmitButton.classList.add("form__submit-button_inactive");
  addCardSubmitButton.disabled = true;
  event.target.reset();
}
