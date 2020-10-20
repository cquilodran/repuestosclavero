import React, { useReducer } from 'react'
import { reducerMarcaProducto } from '../reducer/reducerMarcaProducto'

const ContextMarcaProducto = React.createContext()
const { Provider, Consumer } = ContextMarcaProducto

const ProviderMarcaProducto = ({ children }) => {
  const [state, dispatch] = useReducer(reducerMarcaProducto, {
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
  ProviderMarcaProducto,
  Consumer as useContextMarcaProducto,
  ContextMarcaProducto
}


