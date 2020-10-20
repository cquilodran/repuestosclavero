import React from 'react'
import DetalleMarcaProducto from '../detalleMarcaProducto'

const ListaMarcaProducto = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleMarcaProducto paginaActual={paginaActual} />
    </div>
  )
}

export default ListaMarcaProducto
