import { closePopup, openPopup, cardForm } from "./modals";
import {
  addCardSubmitButton,
  popupTypeAddCard,
  popupTypeImage,
} from "./constants.js";
import {
  sendCard,
  getUserId,
  deleteCardFromServer,
  deleteLike,
  putLike,
  getLikesCount,
  renderLoading,
} from "./api";

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
      if (el.owner._id === user._id) {
        deleteButton.classList.add("card__delete-button_enable");
      }
      function deleteCard() {
        deleteButton.closest(".card").remove();
        deleteCardFromServer(el._id);
      }
      const likeButton = cardElement.querySelector(".card__like-button");
      function likeCard() {
        if (likeButton.classList.contains("card__like-button_active")) {
          deleteLike(el._id)
            .then((el) => {
              const likes = el.likes;
              cardLikeCount.textContent = likes.length;
            })
            .catch((err) => console.log(err));
          likeButton.classList.remove("card__like-button_active");
        } else {
          likeButton.classList.add("card__like-button_active");
          putLike(el._id)
            .then((el) => {
              const likes = el.likes;
              cardLikeCount.textContent = likes.length;
            })
            .catch((err) => console.log(err));
        }
      }
      const cardLikeCount = cardElement.querySelector(".card__likes-count");
      getLikesCount()
        .then(() => {
          const likes = el.likes;
          cardLikeCount.textContent = likes.length;
          if (likes.some((myUser) => myUser._id === user._id)) {
            likeButton.classList.add("card__like-button_active");
          }
        })
        .catch((err) => console.log(err));
      likeButton.addEventListener("mousedown", likeCard);
      function openPopupImage() {
        popupImage.src = cardImg.src;
        popupImage.alt = cardImg.alt;
        popupImageDescription.textContent = cardHeading.textContent;
        openPopup(popupTypeImage);
      }
      cardImg.addEventListener("click", openPopupImage);
    })
    .catch((err) => console.log(err));
  return cardElement;
}

export function submitFormAddCard(event) {
  renderLoading(true, cardForm, "Создать");
  event.preventDefault();
  sendCard(placeNameInput.value, placeLinkInput.value)
    .then((res) => {
      cardsList.prepend(addCard(res));
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, cardForm, "Создать"));
  closePopup(popupTypeAddCard);
  addCardSubmitButton.classList.add("form__submit-button_inactive");
  addCardSubmitButton.disabled = true;
  event.target.reset();
}
