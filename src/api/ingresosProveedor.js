import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaIngresoProveedorApi(page = 1, limit = 10, sucursal) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/lista-ingreso-proveedor?page=${page}&limit=${limit}&sucursal=${sucursal}`
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
export async function postIngresoProveedorApi(data) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/crear-ingreso-proveedor`
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
export async function putActDesIngresoProveedorApi(id, estado, page = 1, sucursal_id) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/act-desac-ingreso-proveedor/${id}?page=${page}`
  const params = {
    method: "PUT",
    body: JSON.stringify({ activo: estado, sucursal: sucursal_id }),
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
export async function editarIngresoProveedorApi(id, data, page = 1) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/editar-ingreso-proveedor/${id}?page=${page}`
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
export async function buscaIngresoProveedorPorNumeroDocumentoApi(values, sucursal) {
  const token = getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/buscar-ingreso-proveedor?values=${values}&sucursal=${sucursal}`
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
    return { ok: false, e }
  }
}