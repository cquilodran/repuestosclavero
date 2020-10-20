import React from 'react'
import DetalleLadoVehiculo from '../detalleLadoVehiculo'

const ListaLadoVehiculo = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleLadoVehiculo paginaActual={paginaActual} />
    </div>
  )
}

export default ListaLadoVehiculo
