function renderLoading(isLoading, form, message) {
  const submitButtonCurrent = form.querySelector(".form__submit-button");
  if (isLoading) {
    submitButtonCurrent.textContent = message;
  } else {
    submitButtonCurrent.textContent = message;
  }
}
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscKey);
}
export { renderLoading, openPopup, closePopup };
