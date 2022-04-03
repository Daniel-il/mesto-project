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
  popupTypeImageSelector,
} from "./constants";
import { profileDescription, profileName } from "./modals";
import Api from "./api";
import Card from "./card";
import Section from "./section";
import FormValidator from "./validate";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";

const api = new Api(apiConfig);

const popupTypeProfile = new PopupWithForm(
  popupTypeProfileSelector,
  {
    isLoadingText: "Сохранeние...",
    isLoadedText: "Сохранить",
  },
  (inputValues) => {
    popupTypeProfile.renderLoading(true);
    api
      .changeUserData({
        name: inputValues["form-name"],
        about: inputValues["form-description"],
      })
      .then(() => {
        profileName.textContent = inputValues["form-name"];
        profileDescription.textContent = inputValues["form-description"];
        popupTypeProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupTypeProfile.renderLoading(false);
      });
  }
);
popupTypeProfile.setEventListener();

const popupTypeAvatar = new PopupWithForm(
  popupTypeAvatarSelector,
  {
    isLoadingText: "Обновление...",
    isLoadedText: "Обновить",
  },
  (inputValues) => {
    popupTypeAvatar.renderLoading(true);
    api
      .changeAvatar({
        link: inputValues["form-avatar"],
      })
      .then(() => {
        profileImage.src = inputValues["form-avatar"];
        popupTypeAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupTypeAvatar.renderLoading(false);
      });
  }
);
popupTypeAvatar.setEventListener();
const popupTypeImage = new Popup(popupTypeImageSelector);

let userId;
editButton.addEventListener("click", () => {
  popupTypeProfile.open();
  popupTypeProfile.setInputValue({ name: "form-name", value: profileName.textContent });
  popupTypeProfile.setInputValue({ name: "form-description", value: profileDescription.textContent });
});
changeButton.addEventListener("click", () => popupTypeAvatar.open());

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
    const cardsList = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            { name: item.name, link: item.link, _id: item._id, likes: item.likes, owner: item.owner._id },
            userId,
            cardSelector,
            () => {
              popupTypeImage.open();
            }
          );
          const cardElement = card.generate();
          return cardElement;
        },
      },
      cardsListSelector
    );
    cardsList.renderItems(cards);
    const popupTypeAddCard = new PopupWithForm(
      popupTypeAddCardSelector,
      {
        isLoadingText: "Создание...",
        isLoadedText: "Создать",
      },
      (inputValues) => {
        popupTypeAddCard.renderLoading(true);
        api
          .sendCard(inputValues["form-name"], inputValues["form-description"])
          .then((res) => {
            cardsList.addItem(res);
            popupTypeAddCard.close();
          })
          .catch((err) => console.log(err))
          .finally(() => popupTypeAddCard.renderLoading(false));
      }
    );
    popupTypeAddCard.setEventListener();
    addButton.addEventListener("click", () => popupTypeAddCard.open());
  })
  .catch((err) => console.log(err));
