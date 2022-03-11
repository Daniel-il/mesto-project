import "../pages/index.css";
import {
  formElementTypeAddCard,
  popupTypeAddCard,
  popupProfile,
  addButton,
  editButton,
  changeButton,
  popupTypeAvatar
} from "./constants.js";
import { submitFormAddCard } from "./cards";
import { closePopup, openPopup, profileForm, submitFormProfile, setProfileValues, submitAvatarLink, avatarForm} from "./modals";
import { enableValidation, validationSettings} from "./validate";
import {getUserData, getCards} from './api.js';
avatarForm.addEventListener("submit", submitAvatarLink)
profileForm.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => openPopup(popupTypeAddCard));
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  setProfileValues();
});
changeButton.addEventListener('click', () => openPopup(popupTypeAvatar) )
formElementTypeAddCard.addEventListener("submit", submitFormAddCard);
const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})
enableValidation(validationSettings)
getUserData()
getCards()
