export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector, avatarSelector, _id }) {
    this.username = document.querySelector(usernameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
    this.avatar = document.querySelector(avatarSelector);
    this._id = _id;
  }
  getUserInfo() {
    return {
      name: this.username.textContent,
      about: this.userAbout.textContent,
      avatar: this.avatar.src,
      _id: this._id,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this.username.textContent = name;
    this.userAbout.textContent = about;
    this.avatar.src = avatar;
    this._id = _id;
  }
}
