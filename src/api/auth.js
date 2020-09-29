import { basePath, apiVersion, ACCESS_TOKEN, REFRESH_TOKEN } from './config'
import jwtDecode from 'jwt-decode'

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  if (!accessToken || accessToken === "null") {
    return null
  }
  return willEspireToken(accessToken) ? null : accessToken
}
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN)
  if (!refreshToken || refreshToken === "null") {
    return null
  }
  return willEspireToken(refreshToken) ? null : refreshToken
}
export function refrescarAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`
  const bodeyObj = {
    refreshToken: refreshToken
  }
  const params = {
    method: "POST",
    body: JSON.stringify(bodeyObj),
    headers: {
      "content-Type": "application/json"
    }
  }
  return fetch(url, params)
    .then(response => {
      return response.json()
    })
    .then(result => {

      if (result.ok) {
        localStorage.setItem(ACCESS_TOKEN, result.accessToken)
        localStorage.setItem(REFRESH_TOKEN, result.refreshToken)
        return result
      } else {
        logout()
        return result
      }
    })
    .catch(e => {
      return e
    })
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

function willEspireToken(token) {
  const segundos = 60
  const metaToken = jwtDecode(token)
  const { exp } = metaToken
  const now = (Date.now() + segundos) / 1000
  return now > exp
}