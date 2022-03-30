function renderLoading(isLoading, form, message) {
  const submitButtonCurrent = form.querySelector(".form__submit-button");
  if (isLoading) {
    submitButtonCurrent.textContent = message;
  } else {
    submitButtonCurrent.textContent = message;
  }
}
export { renderLoading};
