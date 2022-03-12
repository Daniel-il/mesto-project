import "../pages/index.css";
import {
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
  cardForm,
} from "./modals";
import { enableValidation, validationSettings } from "./validate";
import { getUserData, getCards } from "./api.js";
let userId;
avatarForm.addEventListener("submit", submitAvatarLink);
profileForm.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => openPopup(popupTypeAddCard));
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  setProfileValues();
});
changeButton.addEventListener("click", () => openPopup(popupTypeAvatar));
cardForm.addEventListener("submit", submitFormAddCard);
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
Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    (profileName.textContent = userData.name),
      (profileDescription.textContent = userData.about);
    profileImage.src = userData.avatar;
    userId = userData._id;
    cards.forEach((card) => {
      cardsList.append(addCard(card, userId));
    });
  })
  .catch((err) => console.log(err));
