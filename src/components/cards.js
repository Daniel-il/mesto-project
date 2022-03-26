import { openPopup, cardForm, popupTypeAddCard } from "./modals";
import { popupTypeImage, addCardSubmitButton, apiConfig } from "./constants.js";
import Api from "./api.js";
import { renderLoading, closePopup } from "./utils.js";

const api = new Api(apiConfig);
const popupImage = document.querySelector(".popup__image");
const placeNameInput = document.querySelector(".form__item_el_card-name");
const placeLinkInput = document.querySelector(".form__item_el_link");
const popupImageDescription = document.querySelector(".popup__image-description");
export const cardsList = document.querySelector(".cards__list");
export function addCard(el, user) {
  const cardTemplate = document.querySelector("#card-adding").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardHeading = cardElement.querySelector(".card__heading");
  const cardImg = cardElement.querySelector(".card__image");
  cardHeading.textContent = el.name;
  cardImg.alt = el.name;
  cardImg.src = el.link;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  if (el.owner._id === user) {
    deleteButton.classList.add("card__delete-button_enable");
  }
  function deleteCard() {
    api
      .deleteCardFromServer(el._id)
      .then(() => {
        deleteButton.closest(".card").remove();
      })
      .catch((err) => console.log(err));
  }
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__likes-count");
  const likes = el.likes;
  cardLikeCount.textContent = likes.length;
  if (likes.some((myUser) => myUser._id === user)) {
    likeButton.classList.add("card__like-button_active");
  }
  function likeCard() {
    if (likeButton.classList.contains("card__like-button_active")) {
      api
        .deleteLike(el._id)
        .then((el) => {
          const likes = el.likes;
          cardLikeCount.textContent = likes.length;
          likeButton.classList.remove("card__like-button_active");
        })
        .catch((err) => console.log(err));
    } else {
      api
        .putLike(el._id)
        .then((el) => {
          const likes = el.likes;
          cardLikeCount.textContent = likes.length;
          likeButton.classList.add("card__like-button_active");
        })
        .catch((err) => console.log(err));
    }
  }
  likeButton.addEventListener("mousedown", likeCard);
  function openPopupImage() {
    popupImage.src = cardImg.src;
    popupImage.alt = cardImg.alt;
    popupImageDescription.textContent = cardHeading.textContent;
    openPopup(popupTypeImage);
  }
  cardImg.addEventListener("click", openPopupImage);
  return cardElement;
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
