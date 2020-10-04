import React, { useState, useContext, useEffect } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import { getListaProveedores, crearProveedorApi } from '../../../../api/proveedor'

import FormularioBusquedaDataProveedores from './formularioBusqueda'
import ListaProveedoresDataProveedores from './listaProveedores'
import './ProveedoresData.scss'
import { ContextProveedor } from '../../../../context/contextProveedores'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination";


const ProveedoresData = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextProveedor)
  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  function actualizarLista(page) {
    getListaProveedores(page)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PROVEEDORES", lista })
        }
      })
  }
  useEffect(() => {
    actualizarLista(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  if (busqueda) {
    return (
      <div className="Proveedores_data">
        <h2>Busqueda de Proveedores</h2>
        <Row>
          <Col md={10}>
            <FormularioBusquedaDataProveedores paginaActual={page} />
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
                  <ListaProveedoresDataProveedores paginaActual={page} />
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
      </div>
    )
  }
  return (
    <div className="Proveedores_data">
      <h2>Lista de Proveedores</h2>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status">
            </Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={10}>
                <FormularioBusquedaDataProveedores paginaActual={page} />
              </Col>
              <Col xs={2}>
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
                <ListaProveedoresDataProveedores paginaActual={page} />
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
        actualizarLista={actualizarLista}
        paginaActual={page}

      />
      <ModalMensaje
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div >
  )
}

function CrearRegistro(props) {
  const { actualizarLista, paginaActual } = props
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = values => {
    setLoading(true)
    setTimeout(() => {
      crearProveedorApi(values)
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

      onExit={() => setMessagePut(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Creando proveedor
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
                <Button type='submit'>Crear</Button>

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
        <Button onClick={props.onHide} variant="outline-warning">Cancelar / Salir</Button>
      </Modal.Footer>
    </Modal>
  );
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
export default React.memo(withRouter(ProveedoresData))
