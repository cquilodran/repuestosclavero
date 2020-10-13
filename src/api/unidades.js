import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaUnidadesApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-unidad?page=${page}&limit=${limit}`
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
export async function getListaUnidadesActivoApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-unidad-activo?page=${page}&limit=${limit}`
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
export async function postCrearUnidadesApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-unidad`
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
export async function putActDesUnidadesApi(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-desac-unidad/${id}?page=${page}`
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
export async function editarUnidadesApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-unidad/${id}?page=${page}`
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
export async function buscaUnidadesApi(values, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/buscar-unidad?page=${page}`
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