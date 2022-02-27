import { closePopup, openPopup } from "./modals";
import { popupTypeAddCard, popupTypeImage } from "./constants.js";
const popupImage = document.querySelector(".popup__image");
const placeNameInput = document.querySelector(".form__item_el_card-name");
const placeLinkInput = document.querySelector(".form__item_el_link");
const popupImageDescription = document.querySelector(
  ".popup__image-description"
);
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-adding").content;
function addCard(el) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardHeading = cardElement.querySelector(".card__heading");
  const cardImg = cardElement.querySelector(".card__image");
  cardHeading.textContent = el.name;
  cardImg.alt = el.name;
  cardImg.src = el.link;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  function deleteCard() {
    deleteButton.closest(".card").remove();
  }
  deleteButton.addEventListener("click", deleteCard);
  const likeButton = cardElement.querySelector(".card__like-button");
  function likeCard() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", likeCard);
  function openPopupImage() {
    popupImage.src = cardImg.src;
    popupImage.alt = cardImg.alt;
    popupImageDescription.textContent = cardHeading.textContent;
    openPopup(popupTypeImage);
  }
  cardImg.addEventListener("click", openPopupImage);
  return cardElement;
}
initialCards.forEach((el) => {
  cardsList.append(addCard(el));
});
export function submitFormAddCard(event) {
  event.preventDefault();
  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;
  cardsList.prepend(addCard(card));
  closePopup(popupTypeAddCard);
  event.target.reset();
}
function keyHandler(evt) {
  if (evt.key === "Enter") {
    submitFormAddCard
  }
}
