import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaProductoApi(page = 1, limit = 10) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-producto?page=${page}&limit=${limit}`
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
export async function postCrearProductoApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-producto`
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
export async function putActDesProductoApi(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-desac-producto/${id}?page=${page}`
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
// export async function putActDesProductoEcommerceApi(id, estado, page = 1) {
//   const token = getAccessTokenApi()
//   const url = `${basePath}/${apiVersion}/act-desac-producto-ecommerce/${id}?page=${page}`
//   const params = {
//     method: "PUT",
//     body: JSON.stringify({ ecommerce: estado }),
//     headers: {
//       "content-Type": "application/json",
//       Authorization: token
//     }
//   }
//   try {
//     const response = await fetch(url, params)
//     const result = await response.json()
//     return result
//   } catch (e) {
//     return e
//   }

// }
export async function buscaProductoApi(values, page = 1) {
  const token = getAccessTokenApi()
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  const url = `${basePath}/${apiVersion}/buscar-producto?page=${page}`
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
export async function editarProductoApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-producto/${id}?page=${page}`
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
export async function crearFotoProductoApi(image, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-imagen-producto?page=${page}`
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
  const url = `${basePath}/${apiVersion}/get-imagen-productos/${imageName}?page=${page}`
  try {
    const response = await fetch(url)
    // const result = await response.json()
    // console.log(result);

    return response
  } catch (e) {
    return { ok: false, e }
  }
}