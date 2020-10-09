import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaDocumentosApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-documentos?page=${page}&limit=${limit}`
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
export async function postCrearDocumentosApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-documento`
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
export async function putActDesDocumentosApi(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-des-documentos/${id}?page=${page}`
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
export async function editarDocumentosApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-documento/${id}?page=${page}`
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
export async function buscaDocumentosApi(values, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/buscar-documento?page=${page}`
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