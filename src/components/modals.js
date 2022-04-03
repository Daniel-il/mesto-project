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

export {
  profileForm,
  avatarForm,
  cardForm,
};
