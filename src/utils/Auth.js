const API_URL = "https://auth.nomoreparties.co";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (password, email ) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    console.log(res);
    return getResponse(res);
  });
};

export const login = (password, email ) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    console.log(res);
    return getResponse(res);
  });
};

export const validityToken = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`
    },  
  }).then((res) => {
    console.log(res);
    return getResponse(res);
  });
};

