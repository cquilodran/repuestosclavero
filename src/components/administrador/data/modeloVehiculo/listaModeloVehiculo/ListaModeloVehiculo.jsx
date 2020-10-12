import React from 'react'
import DetalleModeloVehiculo from '../detalleModeloVehiculo'

const ListaModeloVehiculo = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleModeloVehiculo paginaActual={paginaActual} />
    </div>
  )
}

export default ListaModeloVehiculo
