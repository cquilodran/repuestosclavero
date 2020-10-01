import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

export async function getListaProveedores(page = 1) {
  const token = await getAccessTokenApi()
  const url = `${basePath}/${apiVersion}/lista-ingreso-proveedor?${page}`
  const params = {
    method: "POST",
    body: JSON.stringify(),
    headers: {
      "content-Type": "application/json"
    }
  }
  return token
}