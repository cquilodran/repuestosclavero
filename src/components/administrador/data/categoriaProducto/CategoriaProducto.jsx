import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner, Image } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import { getListaCategoriaApi, postCrearCategoriaApi, crearFotoCategoriaApi } from '../../../../api/categoriaProducto'
import { ContextCategoriaProducto } from '../../../../context/contextCategoriaProducto'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination";
import ListaCategoriaProducto from './listaCategoriaProducto'
import { useDropzone } from 'react-dropzone'

// import FormularioBusquedaModeloVehiculo from './formularioBusqueda'

import logo from '../../../../assets/logo-amarillo.png'
import './CategoriaProducto.scss'

const CategoriaProducto = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextCategoriaProducto)

  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  function actualizarLista(page) {
    getListaCategoriaApi(page)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_CATEGORIA_PRODUCTO", lista })
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
        <h2>Buscando categoria de producto</h2>
        <Row>
          <Col md={10}>
            {/* <FormularioBusquedaModeloVehiculo paginaActual={page} /> */}
            Formulario
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
                  <ListaCategoriaProducto paginaActual={page} />
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
      <h2>Lista categoria de productos</h2>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={10}>
                {/* <FormularioBusquedaModeloVehiculo paginaActual={page} /> */}
                Formulario
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
                <ListaCategoriaProducto paginaActual={page} />
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
  const [imagen, setImagen] = useState(null)
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = values => {
    setLoading(true)
    crearFotoCategoriaApi(imagen.file)
      .then(respuesta => {
        if (respuesta.ok === false) {
          setMessagePut(respuesta.message)
        } else {
          values.imagen = respuesta.imageName
          postCrearCategoriaApi(values)
            .then(respuesta => {
              setLoading(false)
              setMessagePut(respuesta.message)
              if (respuesta.ok) {
                actualizarLista(paginaActual)
              }
            })
        }
      }
      )
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
          Creando categoria de producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col}>
              < UploadImagen imagen={imagen} setImagen={setImagen} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                ref={register({
                  required: {
                    value: true,
                    message: 'Nombre corto o sigla es requerido'
                  }
                })}
              />
              {
                errors.nombre && <span className='text-danger text-small d-block my-1'>{errors.nombre.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Notas</Form.Label>
              <Form.Control
                type="text"
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
function UploadImagen(props) {
  const { imagen, setImagen } = props
  const onDrop = useCallback(
    acceptedFile => {
      const file = acceptedFile[0]
      if (!file) {
        alert("Solo formatos jpg, jpeg, png")
      } else {
        setImagen({ file, preview: URL.createObjectURL(file) })
      }
    }, [setImagen]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg , image/png",
    noKeyboard: true,
    onDrop
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <Image src={logo} roundedCircle className="img-categoria-producto" />
          :
          <Image src={imagen ? imagen.preview : logo} roundedCircle className="img-categoria-producto" />
      }
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
          No puedes ver esta información
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default withRouter(CategoriaProducto) 