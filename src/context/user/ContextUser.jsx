import React, { useState } from 'react'

const ContextUserContext = React.createContext()
const { Provider, Consumer } = ContextUserContext

const ProviderUser = ({ children }) => {
  const [usuario, setUsuario] = useState({
    nombre: null,
    email: null,
    perfil: null,
    sucursal: null
  })

  return (
    <Provider value={{
      usuario
    }}>
      {children}
    </Provider>
  )
}

export {
  ProviderUser,
  Consumer as useContextUser,
  ContextUserContext
}
