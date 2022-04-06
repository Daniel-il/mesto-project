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
      avatar: this.avatar.src,
    }
  }
  setUserInfo({ name, about, avatar }) {
    this.username.textContent = name;
    this.userAbout.textContent = about;
    this.avatar.src = avatar;
  }
}
