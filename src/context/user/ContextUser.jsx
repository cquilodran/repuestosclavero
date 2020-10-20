import React, { useState, useEffect } from 'react'
import { getAccessTokenApi, getRefreshTokenApi, refrescarAccessTokenApi, logout } from '../../api/auth.js'
import jwtDecode from 'jwt-decode'

const ContextUserContext = React.createContext()
const { Provider, Consumer } = ContextUserContext

const ProviderUser = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  async function sesion() {
    const act = getAccessTokenApi()
    if (!act) {
      const rst = getRefreshTokenApi()
      if (!rst) {
        logout()
      } else {
        const result = await refrescarAccessTokenApi(rst)
        const mtoken = jwtDecode(result.accessToken)
        setUsuario(mtoken)
        // refrescarAccessTokenApi(rst)
        //   .then(result => {
        //     const mtoken = jwtDecode(result.accessToken)
        //     setUsuario(mtoken)
        //   })
      }
    } else {
      const mtoken = jwtDecode(act)
      setUsuario(mtoken)
    }
  }
  useEffect(() => {
    sesion()
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
