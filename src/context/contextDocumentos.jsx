import React, { useReducer } from 'react'
import { reducerDocumentos } from '../reducer/reducerDocumentos'

const ContextDocumentos = React.createContext()
const { Provider, Consumer } = ContextDocumentos

const ProviderDocumentos = ({ children }) => {
  const [state, dispatch] = useReducer(reducerDocumentos, {
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
  ProviderDocumentos,
  Consumer as useContextDocumentos,
  ContextDocumentos
}