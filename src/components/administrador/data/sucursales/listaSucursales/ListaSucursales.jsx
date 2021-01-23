import React from 'react'
import DetalleListaSucursales from '../detalleListaSucursales'

const ListaSucursales = (props) => {
  const { paginaactual } = props
  return (
    <div>
      <DetalleListaSucursales paginaActual={paginaactual} />
    </div>
  )
}

export default ListaSucursales
