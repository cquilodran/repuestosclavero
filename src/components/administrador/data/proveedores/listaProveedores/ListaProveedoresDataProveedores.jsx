import React, { useContext } from 'react'
import DetalleListaProveedoresDataProveedores from '../detalleListaProveedors'



const ListaProveedoresDataProveedores = (props) => {
  const { paginaActual } = props
  return (
    <div>
      <DetalleListaProveedoresDataProveedores paginaActual={paginaActual} />
    </div>
  )
}


export default ListaProveedoresDataProveedores
