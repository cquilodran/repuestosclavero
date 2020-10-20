import React from 'react'
import DetalleListaProductos from '../detalleListaproductos'

const ListaProdutos = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleListaProductos paginaActual={paginaActual} />
    </div>
  )
}

export default ListaProdutos
