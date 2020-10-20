import React from 'react'
import DetalleCategoriaProducto from '../detalleCategoriaProducto'

const ListaCategoriaProducto = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleCategoriaProducto paginaActual={paginaActual} />
    </div>
  )
}

export default ListaCategoriaProducto
