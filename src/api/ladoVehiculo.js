import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaLadoVehiculoApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-lado-vehiculo?page=${page}&limit=${limit}`
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
export async function postCrearLadoVehiculoApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-lado-vehiculo`
  const params = {
    method: "POST",
    body: JSON.stringify(data),
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
    return { ok: "error", e }
  }
}
export async function putActDesLadoVehiculoApi(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-desac-lado-vehiculo/${id}?page=${page}`
  const params = {
    method: "PUT",
    body: JSON.stringify({ activo: estado }),
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
export async function editarLadoVehiculoApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-lado-vehiculo/${id}?page=${page}`
  const params = {
    method: "PUT",
    body: JSON.stringify(data),
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
    return { ok: "error", e }
  }
}
export async function buscaLadoVehiculoApi(values, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/buscar-lado-vehiculo?page=${page}`
  const params = {
    method: "PUT",
    body: JSON.stringify(values),
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
    return { ok: false, e }
  }
}