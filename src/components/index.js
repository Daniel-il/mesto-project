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
  avatarSelector,
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
const userInfo = new UserInfo({
  usernameSelector: profileNameSelector,
  userAboutSelector: profileDescriptionSelector,
  avatarSelector: avatarSelector,
});

const formList = Array.from(document.querySelectorAll(".form"));
const formValidators = {};
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationSettings, formElement);
  const formName = formElement.getAttribute('name');
  formValidators[formName] = formValidator;
  formValidator.enableValidation();
});

const popupTypeProfile = new PopupWithForm(
  popupTypeProfileSelector,
  {
    isLoadingText: "Сохранeние...",
    isLoadedText: "Сохранить",
  },
  (inputValues) => {
    return api
      .changeUserData({
        name: inputValues["form-name"],
        about: inputValues["form-description"],
      })
      .then(() => {
        userInfo.setUserInfo({ name: inputValues["form-name"], about: inputValues["form-description"] });
      })
      .catch((err) => console.log(err));
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
    return api
      .changeAvatar({
        link: inputValues["form-avatar"],
      })
      .then(() => {
        userInfo.setUserInfo({ avatar: inputValues["form-avatar"] });
      })
      .catch((err) => console.log(err));
  }
);
popupTypeAvatar.setEventListener();

let userId;
editButton.addEventListener("click", () => {
  formValidators[popupTypeProfile.formName].resetValidation();
  popupTypeProfile.open();
  const {name, about} = userInfo.getUserInfo();
  popupTypeProfile.setInputValue({ name: "form-name", value: name });
  popupTypeProfile.setInputValue({ name: "form-description", value: about });
});
changeButton.addEventListener("click", () => {
  formValidators[popupTypeAvatar.formName].resetValidation();
  popupTypeAvatar.open()
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
        return api
          .sendCard(inputValues["form-name"], inputValues["form-description"])
          .then((res) => {
            cardsList.addItem(res);
          })
          .catch((err) => console.log(err));
      }
    );
    popupTypeAddCard.setEventListener();
    addButton.addEventListener("click", () => {
      formValidators[popupTypeAddCard.formName].resetValidation();
      popupTypeAddCard.open()
    });
  })
  .catch((err) => console.log(err));
