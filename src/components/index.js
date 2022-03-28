import "../pages/index.css";
import {
  popupTypeAddCard,
  popupProfile,
  addButton,
  editButton,
  changeButton,
  popupTypeAvatar,
  profileImage,
  apiConfig,
  cardsListSelector,
  cardSelector
} from "./constants.js";
import { submitFormAddCard } from "./cards";
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
import Api from "./api.js";
import Card from "./cards";
import Section from "./section";
const api = new Api(apiConfig);
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
const cardsList = new Section({items: api.getCards(), renderer: (item) => {
  const card = new Card({name: item.name, link: item.link}, userId, cardSelector);
  const cardElement = card.generate();
  cardsList.addItem(cardElement)
}}, cardsListSelector)
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    (profileName.textContent = userData.name),
      (profileDescription.textContent = userData.about);
    profileImage.src = userData.avatar;
    userId = userData._id;
    cardsList.renderItems(cards)
  })
  .catch((err) => console.log(err));