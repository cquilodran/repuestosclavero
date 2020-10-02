
// import { putActDesProveedor } from '../api/proveedor'

export async function reducerProveedores(state, action) {
  switch (action.type) {
    case "ACTUALIZA_LISTA_PROVEEDORES":
      console.log(action)




      return {
        ...state,
        listaProveedores: action.lista.proveedores
      }

    default:
      return state
  }
}