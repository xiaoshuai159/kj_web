import Cookies from 'js-cookie'

const TokenKey = 'tanzhen_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  //console.log('走到cookie里的setToken了');
  //console.log(token);
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
