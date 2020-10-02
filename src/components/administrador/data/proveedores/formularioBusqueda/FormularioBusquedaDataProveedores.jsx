import React from 'react'
import { Form } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaProveedor } from '../../../../../api/proveedor'
import { useForm } from 'react-hook-form'

import './FormularioBusquedaDataProveedores.scss'

const FormularioBusquedaDataProveedores = () => {
  const { register, errors, handleSubmit, reset } = useForm()

  const onSubmit = values => {
    // console.log(values);
    buscaProveedor(values)
      .then(resultados => {
        console.log(resultados);
      })
  }

  return (
    <div className='FormularioBusquedaDataProveedores'>
      <Form inline onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Busqueda por nombre"
            size="lg"
            name="nombre"
            ref={register()}
          />
          <Search
            size="1.5em"
            type="onsubmit"
            onClick={handleSubmit(onSubmit)}
          />
          <XSquare
            onClick={reset}
            size="1.5em"
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default FormularioBusquedaDataProveedores