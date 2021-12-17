const popupProfile = document.querySelector('.popup')
const editButton = document.querySelector(".profile__edit-button");
function popupOpener(popup) {
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", () => popupOpener(popupProfile));
const closeButton = document.querySelector(".popup__close-button");
function popupCloser(popup) {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", () => popupCloser(popupProfile));
const profile = document.querySelector(".profile__column");
const inputContainer = document.querySelector(".form__input-container");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
let nameInput = inputContainer.querySelector(".form__item_el_name");
let jobInput = inputContainer.querySelector(".form__item_el_description");
function formItems() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
editButton.addEventListener("click", formItems);
formElement = document.querySelector(".form");
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}
formElement.addEventListener("submit", formSubmitHandler);
const submitButton = document.querySelector(".form__submit-button");
submitButton.addEventListener("click",() => popupCloser(popupProfile));
const addButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
addButton.addEventListener('click', () => popupOpener(popupAddCard))
const closeButtonTypeAddCard = document.querySelector(
  ".popup__close-button_type_add-card"
);
closeButtonTypeAddCard.addEventListener("click", () => popupCloser(popupAddCard))
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
  const deleteButton = cardElement.querySelector('.card__delete-button')
  function deleteCard() {
    deleteButton.closest('.card').remove()
  }
  deleteButton.addEventListener('click', deleteCard)
  const likeButton = cardElement.querySelector('.card__like-button')
  function likeCard() {
    likeButton.classList.toggle('card__like-button_active')
  }
  likeButton.addEventListener('click', likeCard)
  const popupTypeImage = document.querySelector('.popup_type_image')
  const popupImage = document.querySelector('.popup__image')
  const popupImageDescription = document.querySelector('.popup__image-description')
  function openPopupImage () {
    popupImage.src = cardImg.src;
    popupImage.alt = cardImg.alt;
    popupImageDescription.textContent = cardHeading.textContent;
  };
  cardImg.addEventListener('click', openPopupImage)
  cardImg.addEventListener('click', () => popupOpener(popupTypeImage))
  const popupImageCloseButton = document.querySelector('.popup__close-button_type_image')
  popupImageCloseButton.addEventListener('click', () => popupCloser(popupTypeImage))
  return cardElement;
}
initialCards.forEach((el) => {
  cardsList.append(addCard(el));
});
placeNameInput = document.querySelector(".form__item_el_card-name");
placeLinkInput = document.querySelector(".form__item_el_link");
function formAddCardSubmitHandler(event) {
  event.preventDefault();
  const card = {};
  card.name = placeNameInput.value;
  card.link = placeLinkInput.value;
  cardsList.prepend(addCard(card));
}
const formElementAddCard = document.querySelector(".form_type_add-card");
formElementAddCard.addEventListener("submit", formAddCardSubmitHandler)
const addCardSubmitButton = document.querySelector('.form__submit-button_type_card')
addCardSubmitButton.addEventListener('click', () => popupCloser(popupAddCard))
