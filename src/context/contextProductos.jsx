import React, { useReducer } from 'react'
import { reducerProductos } from '../reducer/reducerProductos'

const ContextProductos = React.createContext()
const { Provider, Consumer } = ContextProductos

const ProviderProductos = ({ children }) => {
  const [state, dispatch] = useReducer(reducerProductos, {
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
  ProviderProductos,
  Consumer as useContextProductos,
  ContextProductos
}