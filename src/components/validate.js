const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__item_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit-button_inactive");
  } else {
    buttonElement.classList.remove("form__submit-button_inactive");
  }
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid || inputElement.length === 0) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__item"));
  const buttonElement = formElement.querySelector(".form__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(".form__input-container")
    );
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};
