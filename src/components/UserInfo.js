export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, avatarSelector }) {
    this.username = document.querySelector(usernameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
    this.avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this.username.textContent,
      about: this.userAbout.textContent,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this.username.textContent = name;
    this.userAbout.textContent = about;
    this.avatar.src = avatar;
    this._id = _id;
  }
  getUserId() {
    return this._id;
  }
}
