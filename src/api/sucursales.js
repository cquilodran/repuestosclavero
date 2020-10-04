import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaSucursalesApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-sucursal?page=${page}&limit=${limit}`
  const params = {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Authorization: token
    }
  }
  try {
    const response = await fetch(url, params)
    const result = await response.json()
    return result
  } catch (e) {
    return e
  }
}

export async function postCrearSucursalesApi(data) {
  const token = getAccessTokenApi()
  console.log("Creando Sucursal");
}