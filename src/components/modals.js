import {
  popupTypeAddCard,
  popupProfile,
  profileImage,
  popupTypeAvatar,
} from "./constants.js";
import { changeUserData, changeAvatar, renderLoading } from "./api.js";
const profile = document.querySelector(".profile__column");
const inputContainer = document.querySelector(".form__input-container");
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
const avatarInput = document.querySelector(".form__item_el_avatar");
export const nameInput = inputContainer.querySelector(".form__item_el_name");
export const jobInput = inputContainer.querySelector(
  ".form__item_el_description"
);
const cardForm = document.querySelector(".form_type_add-card");
const profileForm = document.querySelector(".form_type_profile");
const avatarForm = document.querySelector(".form_type_avatar");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}
function setProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
function submitAvatarLink(evt) {
  renderLoading(true, avatarForm, "Обновить");
  evt.preventDefault();
  profileImage.src = avatarInput.value;
  changeAvatar({
    link: profileImage.src,
  })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, avatarForm, "Обновить");
    });
  evt.target.reset();
  closePopup(popupTypeAvatar);
}
function submitFormProfile(evt) {
  renderLoading(true, profileForm, "Сохранить");
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  changeUserData({
    name: profileName.textContent,
    about: profileDescription.textContent,
  })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, profileForm, "Сохранить");
    });

  closePopup(popupProfile);
}
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
export {
  closePopup,
  openPopup,
  popupTypeAddCard,
  profileForm,
  submitFormProfile,
  setProfileValues,
  submitAvatarLink,
  avatarForm,
  cardForm,
};
