import React, { useReducer } from 'react'
import { reducerIngresoProveedor } from '../reducer/reducerIngresoProveedor'

const ContextIngresoProveedor = React.createContext()
const { Provider, Consumer } = ContextIngresoProveedor

const ProviderIngresoProveedor = ({ children }) => {
  const [state, dispatch] = useReducer(reducerIngresoProveedor, {
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
  ProviderIngresoProveedor,
  Consumer as useContextIngresoProveedor,
  ContextIngresoProveedor
}