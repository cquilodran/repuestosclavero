import React, { useState, useContext, useEffect } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import Pagination from "react-js-pagination";
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { getListaUsuariosApi } from '../../../../api/usuarios'
import { ContextUsuarios } from '../../../../context/contextUsuarios'
import ListaUsuarios from './listaUsuarios'
import { getListaSucursalesApi } from '../../../../api/sucursales'
import { getListaPerfilesApi } from '../../../../api/perfil'
import { postCrearUsuariosApi } from '../../../../api/usuarios'
import FormularioBusquedaUsuarios from './formularioBusqueda'

const UsuariosData = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextUsuarios)
  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  function actualizarLista(page) {
    getListaUsuariosApi(page)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_USUARIOS", lista })
        }
      })
  }

  useEffect(() => {
    actualizarLista(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  if (busqueda) {
    return (
      <div>
        <h2>Busqueda de Usuarios</h2>
        <Row>
          <Col md={10}>
            <FormularioBusquedaUsuarios paginaActual={page} />
          </Col>
          <Col md={2}>
            <OverlayTrigger
              overlay={
                <Tooltip>Nuevo registro</Tooltip>
              }
            >
              <PlusCircle
                className="text-primary"
                size="1.5em"
                onClick={() => setNuevoRegistro(true)}
              />
            </OverlayTrigger>
          </Col>
        </Row>
        <hr />
        {
          docs.length > 0 ?
            <>
              <Row>
                <Col>
                  <ListaUsuarios paginaactual={page} />
                </Col>
              </Row>
              {
                total > 10 ?
                  <Row>
                    <Col>
                      <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={parseInt(page)}
                        itemsCountPerPage={limit}
                        totalItemsCount={total}
                        pageRangeDisplayed={3}
                        onChange={handlePageChange}
                      />
                    </Col>
                  </Row>
                  :
                  null
              }
            </>
            :
            <h3>Sin resultados en tu busqueda</h3>
        }
        <CrearRegistro
          show={nuevoRegistro}
          onHide={() => setNuevoRegistro(false)}
          actualizarlista={actualizarLista}
          paginaactual={page}

        />
        <ModalMensaje
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={10}>
                <FormularioBusquedaUsuarios paginaActual={page} />
              </Col>
              <Col>
                <OverlayTrigger
                  overlay={
                    <Tooltip>Nuevo registro</Tooltip>
                  }
                >
                  <PlusCircle
                    className="text-primary"
                    size="1.5em"
                    onClick={() => setNuevoRegistro(true)}
                  />
                </OverlayTrigger>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <ListaUsuarios paginaactual={page} />
              </Col>
            </Row>
            {
              total > 10 ?
                <Row>
                  <Col>
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={parseInt(page)}
                      itemsCountPerPage={limit}
                      totalItemsCount={total}
                      pageRangeDisplayed={3}
                      onChange={handlePageChange}
                    />
                  </Col>
                </Row>
                :
                null
            }
          </>
      }
      <CrearRegistro
        show={nuevoRegistro}
        onHide={() => setNuevoRegistro(false)}
        actualizarlista={actualizarLista}
        paginaactual={page}
      />
      <ModalMensaje
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}
function CrearRegistro(props) {
  const { actualizarlista, paginaactual, ...restoprops } = props
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const [listaPerfiles, setListaPerfiles] = useState([])
  const [listaSucursales, setListaSucursales] = useState([])
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = values => {
    if (values.password !== values.rpassword) {
      alert("Contraseñas deben ser iguales")
    } else {
      if (values.password === "") {
        delete values.password
        setLoading(true)
        postCrearUsuariosApi(values)
          .then(respuesta => {
            setLoading(false)
            setMessagePut(respuesta.message)
            if (respuesta.ok) {
              actualizarlista(paginaactual)
            }
          })
      } else {
        setLoading(true)
        postCrearUsuariosApi(values)
          .then(respuesta => {
            setLoading(false)
            setMessagePut(respuesta.message)
            if (respuesta.ok) {
              actualizarlista(paginaactual)
            }
          })
      }
    }
  }
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
  return (
    <Modal
      {...restoprops}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => setMessagePut(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Creando usuario
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
                placeholder="Email usuario"
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
                placeholder="Obligatorio"
                name='password'
                ref={register({
                  required: {
                    value: true,
                    message: "Contraseña es obligatorio"
                  }
                })}
              />
              {
                errors.password && <span className='text-danger text-small d-block my-1'>{errors.password.message}</span>
              }
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Repite Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Obligatorio"
                name='rpassword'
                ref={register({
                  required: {
                    value: true,
                    message: "Contraseña es obligatorio"
                  }
                })}
              />
              {
                errors.rpassword && <span className='text-danger text-small d-block my-1'>{errors.rpassword.message}</span>
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
                <Button type='submit'>Crear</Button>
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
          No puedes ver esta información
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default withRouter(UsuariosData) 
