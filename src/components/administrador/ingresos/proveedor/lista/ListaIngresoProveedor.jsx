import React from 'react'
import DetalleListaIngresosProveedor from '../detalleLista'

const ListaIngresoProveedor = (props) => {
  const { paginaActual, sucursalactiva } = props
  return (
    <div>
      <DetalleListaIngresosProveedor
        paginaActual={paginaActual}
        sucursalactiva={sucursalactiva}
      />
    </div>
  )
}

export default ListaIngresoProveedor
