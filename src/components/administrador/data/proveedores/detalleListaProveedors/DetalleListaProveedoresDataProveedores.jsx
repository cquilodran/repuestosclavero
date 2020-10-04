import React, { useState, useContext } from 'react'
import { Table, OverlayTrigger, Tooltip, Modal, Button, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Pencil, ClipboardCheck, ClipboardX, Eye } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { putActDesProveedor, editarProveedorApi } from '../../../../../api/proveedor'
import { ContextProveedor } from '../../../../../context/contextProveedores'
import { getListaProveedores } from '../../../../../api/proveedor'

const DetalleListaProveedoresDataProveedores = (props) => {
  const { state: { docs }, dispatch } = useContext(ContextProveedor)
  const { paginaActual } = props

  const [modalShow, setModalShow] = useState({ ver: false, txt: "" })
  const [modalShow2, setModalShow2] = useState({ ver: false, datos: "" })
  const [modalShow3, setModalShow3] = useState({ ver: false, informacion: "" });

  const activarDesactivar = async (id, estado) => {
    const respuesta = await putActDesProveedor(id, !estado)
    setModalShow({ ver: true, txt: respuesta.message })
    if (respuesta.ok) {
      actualizarLista(paginaActual)
    }
  }
  function actualizarLista() {
    getListaProveedores(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PROVEEDORES", lista })
        }
      })
  }
  const verRegistro = (dat) => {
    setModalShow2({ ver: true, datos: dat })
  }
  const editarRegistro = (y) => {
    setModalShow3({ ver: true, informacion: y })
  }
  const heads = ["Activo", "Nombre", "Celular", "Acciones"]
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {
              heads.map((x, i) =>
                x === "Acciones" ?
                  <th key={i} colSpan="3" >
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
                {
                  y.activo ?
                    <td>Sí</td>
                    :
                    <td>No</td>
                }
                <td>{y.nombre}</td>
                <td>{y.celular}</td>
                <td><Pencil
                  width="1.5em"
                  size="1.5em"
                  onClick={() => editarRegistro(y)}
                /></td>
                <td>
                  {
                    y.activo ?
                      <OverlayTrigger
                        key={'top'}
                        overlay={
                          <Tooltip >
                            Desactivar
                            </Tooltip>
                        }
                      >
                        < ClipboardCheck
                          width="1.5em"
                          size="1.5em"
                          onClick={() => activarDesactivar(y._id, y.activo)}
                        />
                      </OverlayTrigger>
                      :
                      <OverlayTrigger
                        key={'top'}
                        overlay={
                          <Tooltip >
                            Activar
                            </Tooltip>
                        }
                      >
                        <ClipboardX
                          width="1.5em"
                          size="1.5em"
                          onClick={() => activarDesactivar(y._id, y.activo)}
                        />
                      </OverlayTrigger>
                  }
                </td>
                <td><Eye
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
      <VerRegisto
        show={modalShow2.ver}
        onHide={() => setModalShow2({ ver: false, datos: "" })}
        data={modalShow2.datos}
      />
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
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.nombre} {data.rut}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <strong>Estado: </strong> {data.activo ? "Activo" : "Inactivo"}
          </Col>
          <Col>
            <strong>Dirección: </strong> {data.direccion}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12} >
            <h4>Contacto principal</h4>
          </Col>
          <Col>
            <strong>Representante: </strong> {data.representante}
          </Col>
          <Col>
            <strong>Celular: </strong> {data.celular}
          </Col>
          <Col>
            <strong>Email: </strong> {data.email}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12} >
            <h4>Contacto secundario</h4>
          </Col>
          <Col>
            <strong>Celular: </strong> {data.celular2}
          </Col>
          <Col>
            <strong>Email: </strong> {data.email2}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function EditarRegistro(props) {
  const { informacion, actualizarLista, paginaActual } = props
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      nombre: informacion.nombre,
      rut: informacion.rut,
      celular: informacion.celular,
      celular2: informacion.celular2,
      direccion: informacion.direccion,
      email: informacion.email,
      email2: informacion.email2,
      representante: informacion.representante,
      web: informacion.web,
    }
  })

  const onSubmit = values => {
    setLoading(true)
    setTimeout(() => {
      editarProveedorApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarLista(paginaActual)
          }
        })
    }, 1000);
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
          Editando proveedor: <strong>{informacion.nombre}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre proveedor"
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
              <Form.Label>RUT</Form.Label>
              <Form.Control
                type="text"
                placeholder="RUT proveedor"
                name="rut"
                ref={register({
                  required: {
                    value: true,
                    message: 'Rut es requerido'
                  }
                })}
              />
              {
                errors.rut && <span className='text-danger text-small d-block my-1'>{errors.rut.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre proveedor"
                name="direccion"
                ref={register({
                  required: {
                    value: true,
                    message: 'Direccion es requerido'
                  }
                })}
              />
              {
                errors.direccion && <span className='text-danger text-small d-block my-1'>{errors.direccion.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Representante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre contacto"
                name="representante"
                ref={register({
                  required: {
                    value: true,
                    message: 'Representante es requerido'
                  }
                })}
              />
              {
                errors.representante && <span className='text-danger text-small d-block my-1'>{errors.representante.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Celular contacto"
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
                type="email"
                placeholder="Email proveedor"
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
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Sitio web</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sitio web"
                name="web"
                ref={register({
                  required: {
                    value: true,
                    message: 'Sitio web es requerido'
                  }
                })}
              />
              {
                errors.web && <span className='text-danger text-small d-block my-1'>{errors.web.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Celular 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Celular secundario"
                name="celular2"
                ref={register({
                  required: {
                    value: true,
                    message: 'Celular 2 es requerido'
                  }
                })}
              />
              {
                errors.celular2 && <span className='text-danger text-small d-block my-1'>{errors.celular2.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email 2</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email secundario"
                name="email2"
                ref={register({
                  required: {
                    value: true,
                    message: 'Email 2 es requerido'
                  }
                })}
              />
              {
                errors.email2 && <span className='text-danger text-small d-block my-1'>{errors.email2.message}</span>
              }
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
              <Spinner animation="grow" variant="danger" /> <h3>{messagePut}</h3>
            </>
            :
            null
        }
        <Button onClick={props.onHide}>Cancelar / Salir</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetalleListaProveedoresDataProveedores
