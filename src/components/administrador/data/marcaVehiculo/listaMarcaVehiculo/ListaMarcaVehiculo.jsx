import React from 'react'
import DetalleMarcaVehiculo from '../detalleMarcaVehiculo'

const ListaMarcaVehiculo = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleMarcaVehiculo paginaActual={paginaActual} />
    </div>
  )
}

export default ListaMarcaVehiculo
