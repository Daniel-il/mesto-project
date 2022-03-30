import {
  profileImage,
  apiConfig
} from "./constants.js";
import Api from "./api.js";
import { renderLoading} from "./utils.js";

const api = new Api(apiConfig);

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
const avatarSubmitButton = document.querySelector(".form__submit-button_type_avatar")
function setProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
function submitAvatarLink(evt) {
  renderLoading(true, avatarForm, "Обновление...");
  evt.preventDefault();
  api.changeAvatar({
    link: avatarInput.value,
  })
    .then(() => {
      profileImage.src = avatarInput.value;
      evt.target.reset();
      closePopup(popupTypeAvatar);
      avatarSubmitButton.disabled = true
      avatarSubmitButton.classList.add('form__submit-button_inactive')
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, avatarForm, "Обновить");
    });
}
function submitFormProfile(evt) {
  renderLoading(true, profileForm, "Сохранeние...");
  evt.preventDefault();
  api.changeUserData({
    name: profileName.textContent,
    about: profileDescription.textContent,
  })
  .then(() => {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupTypeProfile);
  })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, profileForm, "Сохранить");
    });
}
export {
  profileForm,
  submitFormProfile,
  setProfileValues,
  submitAvatarLink,
  avatarForm,
  cardForm,
};
