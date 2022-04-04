import {
  profileImage,
  apiConfig
} from "./constants.js";
import Api from "./api.js";
import { renderLoading} from "./utils.js";

const api = new Api(apiConfig);
const inputContainer = document.querySelector(".form__input-container");
const avatarInput = document.querySelector(".form__item_el_avatar");
export const nameInput = inputContainer.querySelector(".form__item_el_name");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
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
