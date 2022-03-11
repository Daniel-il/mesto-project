const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
    headers: {
      authorization: '5b7f82d3-27ce-4c91-a980-7124a27c0a62',
      'Content-Type': 'application/json'
    }
  }
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
   return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
export function getCards() {
  return  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        
}
export function changeUserData(newData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
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
}
export function sendCard(name, link) {
   return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
}
export function getUserId () {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
export function deleteCardFromServer(id) {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}
export function putLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}
export function deleteLike(id) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}
export function getLikesCount() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}
export function changeAvatar(newAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
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
}