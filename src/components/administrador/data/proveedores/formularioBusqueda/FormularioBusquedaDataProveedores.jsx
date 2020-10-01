import React from 'react'
import { Form } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'

import './FormularioBusquedaDataProveedores.scss'

const FormularioBusquedaDataProveedores = () => {
  return (
    <div className='FormularioBusquedaDataProveedores'>
      <Form inline>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Busqueda por nombre"
            size="lg"
          />
          <Search size="1.5em" />
        </Form.Group>
      </Form>
    </div>
  )
}

export default FormularioBusquedaDataProveedores