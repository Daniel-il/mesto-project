import "../pages/index.css";
import {
  formElementTypeAddCard,
  popupTypeAddCard,
  popupProfile,
  addButton,
  editButton,
} from "./constants.js";
import { submitFormAddCard } from "./cards";
import { closePopup, openPopup, formElement, submitFormProfile, setProfileValues} from "./modals";
import { enableValidation, validationSettings} from "./validate";
formElement.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => openPopup(popupTypeAddCard));
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  setProfileValues();
});
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
