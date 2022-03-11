import { profileDescription, profileName, profileForm, cardForm, avatarForm } from "./modals";
import { profileImage} from "./constants";
import { addCard, cardsList} from "./cards";
export function renderLoading(isLoading, form, message) {
    if (isLoading) {
        const submitButtonCurrent = form.querySelector('.form__submit-button')
        submitButtonCurrent.textContent = 'Сохранение...'
    } else {
        const submitButtonCurrent = form.querySelector('.form__submit-button')
        submitButtonCurrent.textContent = message
    }
  }
export function getUserData() {
    fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
        headers: {
            authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then((data) => {
            profileName.textContent = data.name,
            profileDescription.textContent = data.about
            profileImage.src = data.avatar
        })
        .catch((err) => {
            console.log(err)
        })
}
export function getCards() {
  return  fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
        headers: {
            authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then((data) => {
            const cards = Array.from(data)
            cards.forEach((card) => {
                cardsList.append(addCard(card));
            });
        })
        
        .catch((err) => {
            console.log(err)
        })

}
export function changeUserData(newData) {
    renderLoading(true, profileForm, 'Сохранить')
    fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newData.name,
            about: newData.about
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        renderLoading(false, profileForm, 'Сохранить')
    })
}
export function sendCard(newCard) {
    renderLoading(true, cardForm, 'Создать')
    fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
        method: 'POST',
        headers: {
            authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        renderLoading(false, cardForm, 'Создать')
    })
}
export function getUserId () {
    return fetch("https://nomoreparties.co/v1/plus-cohort7/users/me", {
      headers: {
        authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
        console.log(err)
    })
}
export function deleteCardFromServer(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err)
      })
}
export function putLike(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err)
      })
}
export function deleteLike(id) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err)
      })
}
export function getLikesCount() {
    return fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
        method: 'GET',
        headers: {
          authorization: "5b7f82d3-27ce-4c91-a980-7124a27c0a62",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err)
      })
}
export function changeAvatar(newAvatar) {
    renderLoading(true, avatarForm, 'Обновить')
    return fetch('https://nomoreparties.co/v1/plus-cohort7/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar.link
        })
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
          console.log(err)
      })
    .finally(() => {
        renderLoading(false, avatarForm, 'Обновить')
    })
}