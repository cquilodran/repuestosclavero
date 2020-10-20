import React from 'react'
import DetalleListaUnidades from '../detalleListaUnidades'

const ListaUnidades = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleListaUnidades paginaActual={paginaActual} />
    </div>
  )
}

export default ListaUnidades
