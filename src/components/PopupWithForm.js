import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { isLoadingText, isLoadedText }, handleSubmitForm) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._submitButton = this._formElement.querySelector(".form__submit-button");
    this._inputList = Array.from(this._formElement.querySelectorAll(".form__item"));
    this._handleSubmitForm = handleSubmitForm;
    this._isLoadingText = isLoadingText;
    this._isLoadedText = isLoadedText;
  }

  setEventListener() {
    super.setEventListener();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleSubmitForm(inputValues);
      this._formElement.reset();
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._formElement.reset();
    this._submitButton.classList.add("form__submit-button_inactive");
    this._submitButton.disabled = true;
  }

  renderLoading(isLoading) {
    const submitButtonCurrent = this._formElement.querySelector(".form__submit-button");
    if (isLoading) {
      submitButtonCurrent.textContent = this._isLoadingText;
    } else {
      submitButtonCurrent.textContent = this._isLoadedText;
    }
  }

  setInputValue({ name, value }) {
    const inputElement = this._inputList.find((input) => {
      return input.name === name;
    });
    inputElement.value = value;
  }
}
