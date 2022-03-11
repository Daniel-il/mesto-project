import "../pages/index.css";
import {
  formElementTypeAddCard,
  popupTypeAddCard,
  popupProfile,
  addButton,
  editButton,
  changeButton,
  popupTypeAvatar,
  profileImage,
} from "./constants.js";
import { submitFormAddCard, cardsList, addCard } from "./cards";
import {
  closePopup,
  openPopup,
  profileForm,
  submitFormProfile,
  setProfileValues,
  submitAvatarLink,
  avatarForm,
  profileDescription,
  profileName,
} from "./modals";
import { enableValidation, validationSettings } from "./validate";
import { getUserData, getCards } from "./api.js";
avatarForm.addEventListener("submit", submitAvatarLink);
profileForm.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => openPopup(popupTypeAddCard));
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  setProfileValues();
});
changeButton.addEventListener("click", () => openPopup(popupTypeAvatar));
formElementTypeAddCard.addEventListener("submit", submitFormAddCard);
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
enableValidation(validationSettings);
getUserData()
  .then((data) => {
    profileName.textContent = data.name,
    profileDescription.textContent = data.about;
    profileImage.src = data.avatar;
  })
  .catch((err) => console.log(err));
getCards()
  .then((data) => {
    const cards = Array.from(data);
    cards.forEach((card) => {
      cardsList.append(addCard(card));
    });
  })
  .catch((err) => console.log(err));
