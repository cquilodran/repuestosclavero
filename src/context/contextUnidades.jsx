import React, { useReducer } from 'react'
import { reducerUnidades } from '../reducer/reducerUnidades'

const ContextUnidades = React.createContext()
const { Provider, Consumer } = ContextUnidades

const ProviderUnidades = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUnidades, {
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
  ProviderUnidades,
  Consumer as useContextUnidades,
  ContextUnidades
}