import React, { useState, useEffect } from 'react'
import { getAccessTokenApi, getRefreshTokenApi, refrescarAccessTokenApi, logout } from '../../api/auth.js'
import jwtDecode from 'jwt-decode'

const ContextUserContext = React.createContext()
const { Provider, Consumer } = ContextUserContext

const ProviderUser = ({ children }) => {
  const [usuario, setUsuario] = useState({
    user_id: null,
    user_nombre: null,
    user_activo: null,
    perfil_id: null,
    perfil_activo: null,
    perfil_valor: null,
    perfil_nombre: null,
    sucursal_id: null,
    sucursal_activo: null,
    sucursal_nombre: null,
    cargado: true
  })


  useEffect(() => {
    const act = getAccessTokenApi()
    if (!act) {
      const rst = getRefreshTokenApi()
      if (!rst) {
        logout()
      } else {
        refrescarAccessTokenApi(rst)
          .then(result => {
            const mtoken = jwtDecode(result.accessToken)
            setUsuario(mtoken)
          })
      }
    } else {
      const mtoken = jwtDecode(act)
      setUsuario(mtoken)
    }
  }, [])

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
