import React, { useReducer } from 'react'
import { reducerMarcaVehiculo } from '../reducer/reducerMarcaVehiculo'

const ContextMarcaVehiculo = React.createContext()
const { Provider, Consumer } = ContextMarcaVehiculo

const ProviderMarcaVehiculo = ({ children }) => {
  const [state, dispatch] = useReducer(reducerMarcaVehiculo, {
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
  ProviderMarcaVehiculo,
  Consumer as useContextMarcaVehiculo,
  ContextMarcaVehiculo
}


