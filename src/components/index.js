import "../pages/index.css";
import {
  popupTypeAddCardSelector,
  popupTypeProfileSelector,
  addButton,
  editButton,
  changeButton,
  popupTypeAvatarSelector,
  profileImage,
  apiConfig,
  cardsListSelector,
  cardSelector,
  validationSettings,
  popupTypeImageSelector
} from "./constants";
import { submitFormAddCard } from "./card";
import {
  profileForm,
  submitFormProfile,
  setProfileValues,
  submitAvatarLink,
  avatarForm,
  profileDescription,
  profileName,
  cardForm,
} from "./modals";
import Api from "./api";
import Card from "./card";
import Section from "./section";
import FormValidator from "./validate";
import Popup from "./Popup";

const api = new Api(apiConfig);
const popupTypeAddCard = new Popup(popupTypeAddCardSelector);
const popupTypeProfile = new Popup(popupTypeProfileSelector);
const popupTypeAvatar = new Popup(popupTypeAvatarSelector);
const popupTypeImage= new Popup(popupTypeImageSelector);

let userId;
avatarForm.addEventListener("submit", submitAvatarLink);
profileForm.addEventListener("submit", submitFormProfile);
addButton.addEventListener("click", () => popupTypeAddCard.open());
editButton.addEventListener("click", () => {
  popupTypeProfile.open();
  setProfileValues();
});
changeButton.addEventListener("click", () => popupTypeAvatar.open());
cardForm.addEventListener("submit", submitFormAddCard);

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidator.enableValidation();
});

Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    (profileName.textContent = userData.name), (profileDescription.textContent = userData.about);
    profileImage.src = userData.avatar;
    userId = userData._id;
    const cardsList = new Section({items: api.getCards(), renderer: (item) => {
      const card = new Card({name: item.name, link: item.link, _id : item._id, likes: item.likes, owner: item.owner._id}, userId, cardSelector, () => {
        popupTypeImage.open();
      });
      const cardElement = card.generate();
      cardsList.addItem(cardElement)
    }}, cardsListSelector)
    cardsList.renderItems(cards)
  })
  .catch((err) => console.log(err));
