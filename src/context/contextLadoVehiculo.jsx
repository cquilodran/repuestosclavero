import React, { useReducer } from 'react'
import { reducerLadoVehiculo } from '../reducer/reducerLadoVehiculo'

const ContextLadoVehiculo = React.createContext()
const { Provider, Consumer } = ContextLadoVehiculo

const ProviderLadoVehiculo = ({ children }) => {
  const [state, dispatch] = useReducer(reducerLadoVehiculo, {
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
  ProviderLadoVehiculo,
  Consumer as useContextLadoVehiculo,
  ContextLadoVehiculo
}


