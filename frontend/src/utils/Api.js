import {apiOptions} from './utils'


class Api{
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  };

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
         return response.json() 
        };

        throw new Error(response.statusText);
      })
  }

  getUserPofile() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
  }

  editUserProfile(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  editUserAvatar(data) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
  }

  createCard(data) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  _setLike(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
  }

  _unsetLike(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  changeLikeStatus(cardId, isLiked) {
    return isLiked ? this._setLike(cardId) : this._unsetLike(cardId);
  }

  delCard(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
  }
};


export const api = new Api(apiOptions);

export default api