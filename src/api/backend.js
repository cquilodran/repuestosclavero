import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaProveedores(page = 1) {
  const token = getAccessTokenApi()
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWYzZGIyODc5MDg5ZTgyYmVjZmIxMGYyIiwidXNlcl9ub21icmUiOiJDcmlzdGlhbiIsInVzZXJfYWN0aXZvIjp0cnVlLCJwZXJmaWxfaWQiOiI1ZjBjYjNiMWNiOGY0ODNkOTgxNDA3YzkiLCJwZXJmaWxfYWN0aXZvIjp0cnVlLCJwZXJmaWxfdmFsb3IiOjEsInBlcmZpbF9ub21icmUiOiJBZG1pbmlzdHJhZG9yIiwic3VjdXJzYWxfaWQiOiI1ZjAyZDNjZmJmOGQxMzFmYjA3MTQ4NTEiLCJzdWN1cnNhbF9hY3Rpdm8iOmZhbHNlLCJzdWN1cnNhbF9ub21icmUiOiJTYW50aWFnbyIsImNyZWF0ZVRva2VuIjoxNjAxNTIwODQ5LCJleHAiOjE2MDE2MDcyNDl9.BIXPUKD4qJry4l-5zLmHsHMKSXG--VmCrdkCnMWLZCM"
  const url = `${basePath}/${apiVersion}/lista-proveedores?page${page}`
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
  const url = `${basePath}/${apiVersion}/act-des-proveedor/${id}?page${page}`
  const params = {
    method: "PUT",
    body: estado,
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