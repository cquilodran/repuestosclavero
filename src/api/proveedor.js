import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'



const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWYzZGIyODc5MDg5ZTgyYmVjZmIxMGYyIiwidXNlcl9ub21icmUiOiJDcmlzdGlhbiIsInVzZXJfYWN0aXZvIjp0cnVlLCJwZXJmaWxfaWQiOiI1ZjBjYjNiMWNiOGY0ODNkOTgxNDA3YzkiLCJwZXJmaWxfYWN0aXZvIjp0cnVlLCJwZXJmaWxfdmFsb3IiOjEsInBlcmZpbF9ub21icmUiOiJBZG1pbmlzdHJhZG9yIiwic3VjdXJzYWxfaWQiOiI1ZjAyZDNjZmJmOGQxMzFmYjA3MTQ4NTEiLCJzdWN1cnNhbF9hY3Rpdm8iOmZhbHNlLCJzdWN1cnNhbF9ub21icmUiOiJTYW50aWFnbyIsImNyZWF0ZVRva2VuIjoxNjAxNTIwODQ5LCJleHAiOjE2MDE2MDcyNDl9.BIXPUKD4qJry4l-5zLmHsHMKSXG--VmCrdkCnMWLZCM"
export async function getListaProveedores(page = 1, limit = 1000) {
  const token = getAccessTokenApi()

  const url = `${basePath}/${apiVersion}/lista-proveedores?page=${page}&limit=${limit}`
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
export async function putActDesProveedor(id, estado, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-des-proveedor/${id}?page=${page}`
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
export async function editarProveedorApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-proveedor/${id}?page=${page}`
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
export async function crearProveedorApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-proveedor`
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
export async function buscaProveedor(values) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/busca-proveedor`
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