import React, { useState, useContext, useEffect } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import { getListaSucursalesApi, postCrearSucursalesApi } from '../../../../api/sucursales'
import { ContextSucursales } from '../../../../context/contextSucursales'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination";
import ListaSucursales from './listaSucursales'
import FormularioBusquedaSucursales from './formularioBusqueda'


const SucursalesData = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextSucursales)
  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  function actualizarLista(page) {
    getListaSucursalesApi(page)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_SUCURSALES", lista })
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
        <h2>Busqueda de Sucursales</h2>
        <Row>
          <Col md={10}>
            <FormularioBusquedaSucursales paginaActual={page} />
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
                  <ListaSucursales paginaActual={page} />
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
          actualizarLista={actualizarLista}
          paginaActual={page}

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
      <h2>Lista Sucursales</h2>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={10}>
                <FormularioBusquedaSucursales paginaActual={page} />
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
                <ListaSucursales paginaActual={page} />
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
    </div>
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
      postCrearSucursalesApi(values)
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
          Creando Sucursal
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
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección sucursal"
                name="direccion"
                ref={register({
                  required: {
                    value: true,
                    message: 'Dirección sucursal es requerido'
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
              <Form.Label>Notas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Notas sucursal"
                name="notas"
                ref={register({
                  required: {
                    value: true,
                    message: 'Notas es requerido'
                  }
                })}
              />
              {
                errors.notas && <span className='text-danger text-small d-block my-1'>{errors.notas.message}</span>
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
export default withRouter(SucursalesData) 