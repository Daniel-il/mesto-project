export default class UserInfo {
  constructor({ usernameSelector, userAboutSelector }) {
    this.username = document.querySelector(usernameSelector);
    this.userAbout = document.querySelector(userAboutSelector);
  }
  getUserInfo() {
    return {
      name: this.username.textContent,
      about: this.userAbout.textContent,
    };
  }
  setUserInfo(name, about) {
    this.username.textContent = name;
    this.userAbout.textContent = about;
  }
}
