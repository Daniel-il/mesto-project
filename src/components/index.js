import "../pages/index.css";
import {
  popupTypeAddCardSelector,
  popupTypeProfileSelector,
  addButton,
  editButton,
  changeButton,
  popupTypeAvatarSelector,
  apiConfig,
  cardsContainer,
  cardSelector,
  validationSettings,
  popupTypeImageSelector,
  popupImage,
  popupImageDescription,
  profileNameSelector,
  profileDescriptionSelector,
  avatarSelector
} from "./constants";
import Api from "./Api";
import Card from "./Card";
import Section from "./Section";
import FormValidator from "./FormValidator";
import PopupWithImage from "./PopupWithImage";
import UserInfo from "./UserInfo";
import PopupWithForm from "./PopupWithForm";
const popupTypeImage = new PopupWithImage(popupTypeImageSelector, popupImage, popupImageDescription);
popupTypeImage.setEventListener();
const api = new Api(apiConfig);
const userInfo = new UserInfo({ usernameSelector: profileNameSelector, userAboutSelector: profileDescriptionSelector, avatarSelector: avatarSelector });
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
        userInfo.setUserInfo({ name: inputValues["form-name"], about: inputValues["form-description"] });
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
       userInfo.setUserInfo({avatar: inputValues["form-avatar"] }) 
       popupTypeAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupTypeAvatar.renderLoading(false);
      });
  }
);
popupTypeAvatar.setEventListener();

let userId;
editButton.addEventListener("click", () => {
  popupTypeProfile.open();
  popupTypeProfile.setInputValue({ name: "form-name", value: userInfo.getUserInfo().name });
  popupTypeProfile.setInputValue({ name: "form-description", value: userInfo.getUserInfo().about });
});
changeButton.addEventListener("click", () => popupTypeAvatar.open());

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  formValidator.enableValidation();
});

Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    const cardsList = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            userId,
            {
              handleCardClick: () => {
                popupTypeImage.open(item.link, item.name);
              },
              handleDeleteClick: () => {
                api
                  .deleteCardFromServer(item._id)
                  .then(() => {
                    card.deleteCard();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
              handleLikeClick: () => {
                if (card.isLiked) {
                  api
                    .deleteLike(card._id)
                    .then((el) => {
                      card.likeCard();
                      card.updateLikesCount(el);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  api
                    .putLike(card._id)
                    .then((el) => {
                      card.likeCard();
                      card.updateLikesCount(el);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              },
            },
            cardSelector
          );
          const cardElement = card.generate();
          return cardElement;
        },
      },
      cardsContainer
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
