import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaCategoriaApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-categoria-productos?page=${page}&limit=${limit}`
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
export async function getListaCategoriaActivoApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-categoria-productos-activo?page=${page}&limit=${limit}`
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
export async function postCrearCategoriaApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-categoria-productos`
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
export async function putActDesCategoriaApi(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/activa-desactiva-categoria-productos/${id}?page=${page}`
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
export async function buscaCategoriaApi(values, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/buscar-marca-vehiculo?page=${page}`
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
export async function editarCategoriaApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-categoria-productos/${id}?page=${page}`
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
export async function crearFotoCategoriaApi(image, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-imagen-categoria-productos?page=${page}`
  const formData = new FormData()
  // formData.append("imagen", image, imageName.name)
  formData.append("foto", image)

  const params = {
    method: "PUT",
    body: formData,
    headers: {
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
export async function getImagenApi(imageName, page = 1) {
  const url = `${basePath}/${apiVersion}/get-imagen-categoria-productos/${imageName}?page=${page}`
  try {
    const response = await fetch(url)
    // const result = await response.json()
    // console.log(result);

    return response
  } catch (e) {
    return { ok: false, e }
  }
}