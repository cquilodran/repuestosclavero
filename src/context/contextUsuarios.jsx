import React, { useReducer } from 'react'
import { reducerUsuarios } from '../reducer/reducerUsuarios'

const ContextUsuarios = React.createContext()
const { Provider, Consumer } = ContextUsuarios

const ProviderUsuarios = ({ children }) => {
  const [state, dispatch] = useReducer(reducerUsuarios, {
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
  ProviderUsuarios,
  Consumer as useContextUsuarios,
  ContextUsuarios
}
