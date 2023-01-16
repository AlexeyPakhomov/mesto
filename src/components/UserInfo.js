class UserInfo {
  constructor(nameSelector,specializationSelector) {
    this._nameUser = document.querySelector(nameSelector);
    this._specializationUser = document.querySelector(specializationSelector);
  }

  //Возвращает объект с данными пользователя. Метод нужен чтобы подставить данные пользователя в форму при открытии.
  getUserInfo() {
    const nameUser = this._nameUser.textContent;
    const specializationUser = this._specializationUser.textContent;
    return { nameUser,specializationUser };
  }

  //Принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({ name,specialization }) {
    this._nameUser.textContent = name;
    this._specializationUser.textContent = specialization;
  }
}

export default UserInfo;
