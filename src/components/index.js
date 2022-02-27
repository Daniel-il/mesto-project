import "../pages/index.css";
import {
  formElementTypeAddCard,
  popupTypeAddCard,
  popupTypeImage,
  popupProfile,
  addButton,
  closeButtonTypeAddCard,
  popupImageCloseButton,
  editButton,
  closeButton
} from "./constants.js";
import { submitFormAddCard } from "./cards";
import { closePopup, openPopup, formElement, submitFormProfile, putFormItems} from "./modals";
import { enableValidation } from "./validate";
formElement.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => openPopup(popupTypeAddCard));
closeButtonTypeAddCard.addEventListener("click", () =>
  closePopup(popupTypeAddCard)
);

popupImageCloseButton.addEventListener("click", () =>
  closePopup(popupTypeImage)
);
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  putFormItems();
});
formElementTypeAddCard.addEventListener("submit", submitFormAddCard);
document.addEventListener("mousedown", (e) => {
  if (
    e.target == popupProfile ||
    e.target == popupTypeAddCard ||
    e.target == popupTypeImage
  ) {
    closePopup(popupProfile);
    closePopup(popupTypeAddCard);
    closePopup(popupTypeImage);
  }
});
closeButton.addEventListener("click", () => closePopup(popupProfile));
enableValidation();
