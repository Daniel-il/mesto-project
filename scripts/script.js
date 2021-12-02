let popup = document.querySelector('.popup')
let editButton = document.querySelector('.profile__edit-button')
function popupOpener() {
  popup.classList.add('popup_opened')
}
editButton.addEventListener('click', popupOpener)
let closeButton = document.querySelector ('.popup__close-button')
function popupCloser() {
  popup.classList.remove('popup_opened')
}
closeButton.addEventListener('click', popupCloser)
