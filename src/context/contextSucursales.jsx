import React, { useReducer } from 'react'
import { reducerSucursales } from '../reducer/reducerSucursales'

const ContextSucursales = React.createContext()
const { Provider, Consumer } = ContextSucursales

const ProviderSucursales = ({ children }) => {
  const [state, dispatch] = useReducer(reducerSucursales, {
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
  ProviderSucursales,
  Consumer as useContextSucursales,
  ContextSucursales
}