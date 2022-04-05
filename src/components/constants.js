const popupTypeAddCardSelector = ".popup_type_add-card";
const popupTypeImageSelector = ".popup_type_image";
const popupTypeProfileSelector = ".popup_type_profile";
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const changeButton = document.querySelector(".profile__avatar-overlay");
const popupTypeAvatarSelector = ".popup_type_avatar";
const profileImage = document.querySelector(".profile__avatar");
const cardsListSelector = document.querySelector(".cards__list");
const cardSelector = '#card-adding';
const popupImage = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__image-description");
const profileNameSelector = ".profile__name"
const profileDescriptionSelector = ".profile__description";
export {
  popupTypeAddCardSelector,
  popupTypeImageSelector,
  popupTypeProfileSelector,
  addButton,
  editButton,
  profileImage,
  changeButton,
  popupTypeAvatarSelector,
  cardSelector,
  cardsListSelector,
  popupImage,
  popupImageDescription,
  profileNameSelector,
  profileDescriptionSelector
};

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
    "Content-Type": "application/json",
  },
};

export const validationSettings = {
  fieldset: '.form__input-container',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  errorClass: 'form__input-error_active'
}
