const popupTypeAddCardSelector = ".popup_type_add-card";
const popupTypeImageSelector = ".popup_type_image";
const popupTypeProfileSelector = ".popup_type_profile";
const submitButton = document.querySelector(".form__submit-button");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const addCardSubmitButton = document.querySelector(
  ".form__submit-button_type_card"
);
const changeButton = document.querySelector(".profile__avatar-overlay");
const popupTypeAvatarSelector = ".popup_type_avatar";
const profileImage = document.querySelector(".profile__avatar");
const likeButton = document.querySelector('.card__like-button')
const cardsListSelector = document.querySelector(".cards__list");
const cardSelector = '#card-adding';
export {
  popupTypeAddCardSelector,
  popupTypeImageSelector,
  popupTypeProfileSelector,
  submitButton,
  addButton,
  addCardSubmitButton,
  editButton,
  profileImage,
  changeButton,
  popupTypeAvatarSelector,
  cardSelector,
  likeButton,
  cardsListSelector
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
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}
