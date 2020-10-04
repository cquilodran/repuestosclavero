import React, { useReducer } from 'react'
import { reducerProveedores } from '../reducer/reducerProveedores'

const ContextProveedor = React.createContext()
const { Provider, Consumer } = ContextProveedor

const ProviderProveedor = ({ children }) => {
  const [state, dispatch] = useReducer(reducerProveedores, {
    docs: [],
    limit: 10,
    page: 1,
    pages: 1,
    total: 0,
    busqueda: false,
    actualizando: true
  })

  return (
    <Provider value={{
      state,
      dispatch
    }}>
      {children}
    </Provider>
  )
}

export {
  ProviderProveedor,
  Consumer as useContextProveedor,
  ContextProveedor
}