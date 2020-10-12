import React, { useContext, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaModeloVehiculoApi, getListaModeloVehiculoApi } from '../../../../../api/modeloVehiculo'
import { useForm } from 'react-hook-form'
import { ContextModeloVehiculo } from '../../../../../context/contextModeloVehiculo'

import './FormularioBusquedaModeloVehiculo.scss'

const FormularioBusquedaModeloVehiculo = (props) => {
  const { paginaActual } = props
  const { dispatch } = useContext(ContextModeloVehiculo)
  const { register, handleSubmit, reset } = useForm()
  const [modalShow, setModalShow] = useState(false)

  const onSubmit = values => {
    buscaModeloVehiculoApi(values, paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          if (lista.message === "Toda la lista") {
            dispatch({ type: "ACTUALIZA_LISTA_MODELO_VEHICULO", lista })
          } else {
            dispatch({ type: "BUSCANDO_MODELO_VEHICULO", lista })
          }
        }
      })
  }
  const cancelar = () => {
    reset()
    getListaModeloVehiculoApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_MODELO_VEHICULO", lista })
        }
      })
  }

  return (
    <div className='FormularioBusquedaModeloVehiculo'>
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
export default FormularioBusquedaModeloVehiculo