import React, { useState, useContext, useEffect } from 'react'
import { Table, OverlayTrigger, Tooltip, Modal, Button, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Pencil, ClipboardCheck, ClipboardX, Eye } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { ContextUsuarios } from '../../../../../context/contextUsuarios'
import { putActDesUsuarioApi, editarUsuarioApi, getListaUsuariosApi } from '../../../../../api/usuarios'
import { getListaSucursalesApi } from '../../../../../api/sucursales'
import { getListaPerfilesApi } from '../../../../../api/perfil'




const DetalleListaUsuarios = (props) => {
  const { state: { docs }, dispatch } = useContext(ContextUsuarios)
  const { paginaActual } = props
  const [modalShow, setModalShow] = useState({ ver: false, txt: "" })
  const [modalShow2, setModalShow2] = useState({ ver: false, datos: "" })
  const [modalShow3, setModalShow3] = useState({ ver: false, informacion: "" })

  function actualizarLista() {
    getListaUsuariosApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow({ ver: true, txt: lista.message })
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_USUARIOS", lista })
        }
      })
  }
  const editarRegistro = (y) => {
    setModalShow3({ ver: true, informacion: y })
  }
  const activarDesactivar = async (id, estado) => {
    const respuesta = await putActDesUsuarioApi(id, !estado)
    setModalShow({ ver: true, txt: respuesta.message })
    if (respuesta.ok) {
      actualizarLista(paginaActual)
    }
  }
  const verRegistro = (dat) => {
    setModalShow2({ ver: true, datos: dat })
  }
  const heads = ["Nombre", "Sucursal", "Perfil", "Acciones"]
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {
              heads.map((x, i) =>
                x === "Acciones" ?
                  <th key={i} colSpan="3">
                    {x}
                  </th>
                  :
                  <th key={i} >
                    {x}
                  </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            docs.map((y, z) =>
              <tr key={z} className={y.activo ? "" : "text-danger"}>
                <td>{y.nombre}</td>
                <td>{y.sucursal.nombre}</td>
                <td>{y.perfil.nombre}</td>
                <td>
                  <Pencil
                    width="1.5em"
                    size="1.5em"
                    onClick={() => editarRegistro(y)}
                  />
                </td>
                <td>
                  {
                    y.activo ?
                      < ClipboardCheck
                        width="1.5em"
                        size="1.5em"
                        onClick={() => activarDesactivar(y._id, y.activo)}
                      />
                      :
                      <ClipboardX
                        width="1.5em"
                        size="1.5em"
                        onClick={() => activarDesactivar(y._id, y.activo)}
                      />
                  }
                </td>
                <td>
                  <Eye
                    width="1.5em"
                    size="1.5em"
                    onClick={() => verRegistro(y)}
                  />
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <ModalMensajes
        show={modalShow.ver}
        txt={modalShow.txt}
        onHide={() => setModalShow({ ver: false, txt: "" })}
      />
      {
        modalShow2.ver ?
          <VerRegisto
            show={modalShow2.ver}
            onHide={() => setModalShow2({ ver: false, datos: "" })}
            data={modalShow2.datos}
          />
          :
          null
      }
      {
        modalShow3.ver ?
          <EditarRegistro
            show={modalShow3.ver}
            informacion={modalShow3.informacion}
            actualizarLista={actualizarLista}
            onHide={() => setModalShow3({ ver: false, informacion: "" })}
            paginaActual={paginaActual}
          />
          :
          null
      }
    </div>
  )
}
function ModalMensajes(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.txt}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
function VerRegisto(props) {
  const { data } = props
  const perfil = data.perfil.nombre
  const sucursal = data.sucursal.nombre
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.nombre} {data.activo ? " -> Activo" : " -> Inactivo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <strong>Nombre: </strong> {data.nombre}
          </Col>
          <Col>
            <strong>Apellido: </strong> {data.apellido}
          </Col>
          <Col>
            <strong>Perfil: </strong> {perfil}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <strong>Celular: </strong> {data.celular}
          </Col>
          <Col>
            <strong>Email: </strong> {data.email}
          </Col>
          <Col>
            <strong>Sucursal: </strong> {sucursal}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
function EditarRegistro(props) {
  const { informacion, actualizarLista, paginaActual } = props
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const [listaPerfiles, setListaPerfiles] = useState([])
  const [listaSucursales, setListaSucursales] = useState([])
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      nombre: informacion.nombre,
      apellido: informacion.apellido,
      celular: informacion.celular,
      email: informacion.email,
      perfil: informacion.perfil.nombre,
      sucursal: informacion.sucursal.nombre
    }
  })

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
    if (values.password !== values.repassword) {
      alert("Contraseñas deben ser iguales")
    } else {
      setLoading(true)
      delete values.repassword
      editarUsuarioApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarLista(paginaActual)
          }
        })
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editando usuario: <strong>{informacion.nombre} {informacion.apellido}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre usuario"
                name="nombre"
                ref={register({
                  required: {
                    value: true,
                    message: 'Nombre es requerido'
                  }
                })}
              />
              {
                errors.nombre && <span className='text-danger text-small d-block my-1'>{errors.nombre.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido usuario"
                name="apellido"
                ref={register({
                  required: {
                    value: true,
                    message: 'Apellido es requerido'
                  }
                })}
              />
              {
                errors.apellido && <span className='text-danger text-small d-block my-1'>{errors.apellido.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Perfil</Form.Label>
              <Form.Control
                as='select'
                type="text"
                placeholder="Perfil usuario"
                name="perfil"
                ref={register({
                  required: {
                    value: true,
                    message: 'Perfil es requerido'
                  }
                })}
              >
                <option
                  defaultValue
                  value={informacion.perfil._id}
                >{informacion.perfil.nombre}</option>
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
              {
                errors.perfil && <span className='text-danger text-small d-block my-1'>{errors.perfil.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Celular usuario"
                name="celular"
                ref={register({
                  required: {
                    value: true,
                    message: 'Celular es requerido'
                  }
                })}
              />
              {
                errors.celular && <span className='text-danger text-small d-block my-1'>{errors.celular.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido usuario"
                name="email"
                ref={register({
                  required: {
                    value: true,
                    message: 'Email es requerido'
                  }
                })}
              />
              {
                errors.email && <span className='text-danger text-small d-block my-1'>{errors.email.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Sucursal</Form.Label>
              <Form.Control
                as='select'
                type="text"
                placeholder="Perfil usuario"
                name="sucursal"
                ref={register({
                  required: {
                    value: true,
                    message: 'Sucursal es requerido'
                  }
                })}
              >
                <option
                  defaultValue
                  value={informacion.sucursal._id}
                >{informacion.sucursal.nombre}</option>
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
              {
                errors.sucursal && <span className='text-danger text-small d-block my-1'>{errors.sucursal.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="No obligatorio para editar"
                name='password'
                ref={register}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Repite Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Obligatorio si cambias el password"
                name='repassword'
                ref={register}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            {
              loading ?
                <Button variant="primary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
                :
                <Button type='submit'>Actualizar</Button>
            }
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer >
        {
          messagePut ?
            <>
              <Spinner animation="grow" variant="warning" /> <h3>{messagePut}</h3>
            </>
            :
            null
        }
        <Button onClick={props.onHide}>Cancelar / Salir</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default DetalleListaUsuarios
