import React from 'react'
import DetalleListaDocumentos from '../detalleListaDocumentos'

const ListaDocumentos = (props) => {
  const { paginaActual } = props

  return (
    <div>
      <DetalleListaDocumentos paginaActual={paginaActual} />
    </div>
  )
}

export default ListaDocumentos
