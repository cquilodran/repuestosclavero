import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Col } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaUsuarioApi, getListaUsuariosApi } from '../../../../../api/usuarios'
import { useForm } from 'react-hook-form'
import { ContextUsuarios } from '../../../../../context/contextUsuarios'
import { getListaSucursalesApi } from '../../../../../api/sucursales'
import { getListaPerfilesApi } from '../../../../../api/perfil'

import './FormularioBusquedaUsuarios.scss'

const FormularioBusquedaSucursales = (props) => {
  const { paginaActual } = props
  const { dispatch } = useContext(ContextUsuarios)
  const { register, handleSubmit, reset } = useForm()
  const [modalShow, setModalShow] = useState(false)
  const [listaPerfiles, setListaPerfiles] = useState([])
  const [listaSucursales, setListaSucursales] = useState([])

  useEffect(() => {
    getListaPerfilesApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          alert("No fue posible recuperar la lista de perfiles")
        } else {
          setListaPerfiles(lista.lista.docs)
        }
      })

    getListaSucursalesApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          alert("No fue posible recuperar la lista de sucursales")
        } else {
          setListaSucursales(lista.lista.docs)
        }
      })
  }, [])

  const onSubmit = values => {
    // console.log(values);
    if (values.nombre === "") {
      values.nombre = null
    }
    if (values.sucursall === 'Sucursal') {
      values.sucursall = null
    }
    if (values.perfill === 'Perfil') {
      values.perfill = null
    }
    buscaUsuarioApi(values, paginaActual)
      .then(lista => {
        console.log(lista);
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          if (lista.message === "Toda la lista") {
            dispatch({ type: "ACTUALIZA_LISTA_USUARIOS", lista })
          } else {
            dispatch({ type: "BUSCANDO_USUARIOS", lista })
          }
        }
      })
  }
  const cancelar = () => {
    reset()
    getListaUsuariosApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_USUARIOS", lista })
        }
      })
  }

  return (
    <div className='FormularioBusquedaUsuarios'>
      <Form inline onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Busqueda por nombre"
            size="lg"
            name="nombre"
            ref={register()}
          />
          <Form.Control
            as='select'
            type="text"
            placeholder="Perfil usuario"
            name="sucursall"
            size="lg"
            ref={register}
          >
            <option defaultValue>Sucursal</option>

            {
              listaSucursales.map((x, i) =>
                x.activo ?
                  <option key={i} value={x._id}>
                    {x.nombre}
                  </option>
                  :
                  null
              )
            }
          </Form.Control>
          <Form.Control
            as='select'
            type="text"
            placeholder="Perfil usuario"
            name="perfill"
            size="lg"
            ref={register}
          >
            <option defaultValue>Perfil</option>

            {
              listaPerfiles.map((x, i) =>
                x.activo ?
                  <option key={i} value={x._id}>
                    {x.nombre}
                  </option>
                  :
                  null
              )
            }
          </Form.Control>
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
    </div >
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