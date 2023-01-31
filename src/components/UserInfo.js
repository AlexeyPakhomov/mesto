class UserInfo {
  constructor(nameSelector,specializationSelector,avatarSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._specializationUser = document.querySelector(specializationSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  //Возвращает объект с данными пользователя. Метод нужен чтобы подставить данные пользователя в форму при открытии.
  getUserInfo() {
    const nameUser = this._nameUser.textContent;
    const specializationUser = this._specializationUser.textContent;
    return { nameUser,specializationUser };
  }

  // Принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._nameUser.textContent = data.name;
    this._specializationUser.textContent = data.about;
    this._avatarSelector.src = data.avatar;
  }
}

export default UserInfo;
