import { basePath, apiVersion } from './config'


export async function iniciarSesion(data) {
  const url = `${basePath}/${apiVersion}/iniciar-sesion`
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-Type": "application/json"
    }
  }
  try {
    const response = await fetch(url, params)
    const result = await response.json()
    if (result.accessToken) {
      return result
    }
    return result
  } catch (e) {
    return { ok: "error", e }
  }
}