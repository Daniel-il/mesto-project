import { popupTypeAddCard, popupTypeImage, popupProfile } from "./constants.js";
const profile = document.querySelector(".profile__column");
const inputContainer = document.querySelector(".form__input-container");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const nameInput = inputContainer.querySelector(".form__item_el_name");
const jobInput = inputContainer.querySelector(".form__item_el_description");
const formElement = document.querySelector(".form");

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey)
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey)
}
function setProfileValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupProfile);
}
function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
export { closePopup, openPopup, popupTypeAddCard, formElement, submitFormProfile, setProfileValues};
