import React, { useContext } from 'react'
import { ContextUserContext } from '../../../context/user/ContextUser'
const HeaderPanelAdministrador = () => {
  const { usuario } = useContext(ContextUserContext)
  console.log(usuario);
  return (
    <div>
      Header panel administrador
    </div>
  )
}

export default HeaderPanelAdministrador