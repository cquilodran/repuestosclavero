import React, { useContext, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaSucursalApi, getListaSucursalesApi } from '../../../../../api/sucursales'
import { useForm } from 'react-hook-form'
import { ContextSucursales } from '../../../../../context/contextSucursales'

import './FormularioBusquedaSucursales.scss'

const FormularioBusquedaSucursales = (props) => {
  const { paginaActual } = props
  const { dispatch } = useContext(ContextSucursales)
  const { register, handleSubmit, reset } = useForm()
  const [modalShow, setModalShow] = useState(false)

  const onSubmit = values => {
    buscaSucursalApi(values, paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          if (lista.message === "Toda la lista") {
            dispatch({ type: "ACTUALIZA_LISTA_SUCURSALES", lista })
          } else {
            dispatch({ type: "BUSCANDO_SUCURSALES", lista })
          }
        }
      })
  }
  const cancelar = () => {
    reset()
    getListaSucursalesApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_SUCURSALES", lista })
        }
      })
  }

  return (
    <div className='FormularioBusquedaSucursales'>
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
            onClick={cancelar}
            size="1.5em"
          />
        </Form.Group>
      </Form>
      <ModalMensaje
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
function ModalMensaje(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Error en la busqueda
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default FormularioBusquedaSucursales