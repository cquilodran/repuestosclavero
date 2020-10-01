import React, { useEffect } from 'react'
import { getListaProveedores } from '../../../../../api/backend'

const ListaProveedoresDataProveedores = (props) => {
  console.log(props);
  useEffect(() => {
    getListaProveedores()
      .then(lista => {
        console.log(lista);
      })
    return () => {

    }
  }, [])
  return (
    <div>
      Lista de proveedores
    </div>
  )
}

export default ListaProveedoresDataProveedores
