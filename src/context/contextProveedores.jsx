import React, { useEffect, useReducer } from 'react'
import { } from '../api/proveedor'
import { reducerProveedores } from '../reducer/reducerProveedores'

const ContextProveedor = React.createContext()
const { Provider, Consumer } = ContextProveedor

const ProviderProveedor = ({ children }) => {
  const [state, dispatch] = useReducer(reducerProveedores, {
    docs: [],
    limit: 10,
    page: 1,
    pages: 1,
    total: 0
  })



  useEffect(() => {

  }, [])
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