import React, { useReducer } from 'react'
import { reducerCategoriaProducto } from '../reducer/reducerCategoriaProducto'

const ContextCategoriaProducto = React.createContext()
const { Provider, Consumer } = ContextCategoriaProducto

const ProviderCategoriaProducto = ({ children }) => {
  const [state, dispatch] = useReducer(reducerCategoriaProducto, {
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
  ProviderCategoriaProducto,
  Consumer as useContextCategoriaProducto,
  ContextCategoriaProducto
}


