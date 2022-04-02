export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector }) {
    this._usernameSelector = usernameSelector;
    this._userInfoSelector = userAboutSelector;
  }
  getUserInfo(data) {
    return {
      name: document.querySelector(this._usernameSelector).textContent = data.name,
      about: document.querySelector(this._userInfoSelector).textContent = data.about
    }
  }
  setUserInfo({data}) {
    data.name = document.querySelector(this._userInfoSelector).textContent 
    data.about = document.querySelector(this._userInfoSelector).textContent
  }
}
