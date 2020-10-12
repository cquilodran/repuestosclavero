import React, { useReducer } from 'react'
import { reducerModeloVehiculo } from '../reducer/reducerModeloVehiculo'

const ContextModeloVehiculo = React.createContext()
const { Provider, Consumer } = ContextModeloVehiculo

const ProviderModeloVehiculo = ({ children }) => {
  const [state, dispatch] = useReducer(reducerModeloVehiculo, {
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
  ProviderModeloVehiculo,
  Consumer as useContextModeloVehiculo,
  ContextModeloVehiculo
}


