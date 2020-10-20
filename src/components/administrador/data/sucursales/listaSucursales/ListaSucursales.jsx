import React from 'react'
import DetalleListaSucursales from '../detalleListaSucursales'

const ListaSucursales = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleListaSucursales paginaActual={paginaActual} />
    </div>
  )
}

export default ListaSucursales
