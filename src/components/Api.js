class Api {
  constructor({ url,headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверка, всё ли в порядке с ответом
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка(статус): ${res.status,res.statusText}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`,{
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`,{
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.specialization
      })
    })
      .then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.url
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  addLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`,{
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  deleteLike(_id) {
    return fetch(`${this._url}/cards/${_id}/likes`,{
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._checkResponse);
  }

}

export default Api;
