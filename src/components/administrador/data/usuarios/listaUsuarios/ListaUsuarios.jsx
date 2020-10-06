import React from 'react'
import DetalleListaUsuarios from '../detalleListaUsuarios'

const ListaUsuarios = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleListaUsuarios paginaActual={paginaActual} />
    </div>
  )
}

export default ListaUsuarios
