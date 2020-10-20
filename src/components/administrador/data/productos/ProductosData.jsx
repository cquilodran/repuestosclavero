import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner, Image } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import { postCrearProductoApi, getListaProductoApi, crearFotoProductoApi } from '../../../../api/productos'
import { getListaMarcaVehiculoActivoApi } from '../../../../api/marcaVehiculo'
import { getListaModeloVehiculoActivoApi } from '../../../../api/modeloVehiculo'
import { getListaCategoriaActivoApi } from '../../../../api/categoriaProducto'
import { getListaLadoVehiculoActivoApi } from '../../../../api/ladoVehiculo'
import { getListaMarcaProductoActivoApi } from '../../../../api/marcaProducto'
import { getListaUnidadesActivoApi } from '../../../../api/unidades'
import { ContextProductos } from '../../../../context/contextProductos'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination";
import ListaProductos from './listaProductos'
import { useDropzone } from 'react-dropzone'
import logo from '../../../../assets/logo-amarillo.png'

import FormularioBusqueProductos from './formularioBusqueda'

const ProductosData = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextProductos)
  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)


  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  function actualizarLista(page) {
    getListaProductoApi(page)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PRODUCTOS", lista })
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
        <h2>Busqueda de Productos</h2>
        <Row>
          <Col md={11}>
            <FormularioBusqueProductos paginaActual={page} />
          </Col>
          <Col md={1}>
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
                  <ListaProductos paginaActual={page} />
                </Col>
              </Row>
              {
                total > 10 &&
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
              }
            </>
            :
            <h3>Sin resultados en tu busqueda</h3>
        }
        {
          nuevoRegistro &&
          <CrearRegistro
            show={nuevoRegistro}
            onHide={() => setNuevoRegistro(false)}
            actualizarlista={actualizarLista}
            paginaactual={page}

          />
        }
        <ModalMensaje
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Lista de productos</h2>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={11}>
                <FormularioBusqueProductos paginaActual={page} />
              </Col>
              <Col xs={1}>
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
                <ListaProductos paginaActual={page} />
              </Col>
            </Row>
            {
              total > 10 &&
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
            }
          </>
      }
      {
        nuevoRegistro &&
        <CrearRegistro
          show={nuevoRegistro}
          onHide={() => setNuevoRegistro(false)}
          actualizarlista={actualizarLista}
          paginaactual={page}
        />
      }
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
  const { register, errors, handleSubmit } = useForm()
  const [marcaVehiculosLista, setmarcaVehiculosLista] = useState([])
  const [modeloVehiculosLista, setmodeloVehiculosLista] = useState([])
  const [categoriasLista, setcategoriasLista] = useState([])
  const [ladoVehiculoLista, setladoVehiculoLista] = useState([])
  const [marcaProductoLista, setmarcaProductoLista] = useState([])
  const [unidadMedidaLista, setunidadMedidaLista] = useState([])
  const [aplicaciones, setAplicaciones] = useState(
    [
      {
        marcaVehiculo: "5f8647e7017ddf2764fa8d8e",
        modeloVehiculo: "5f8649d5017ddf2764fa8d8f",
        años: []
      }
    ]
  )
  const [imagen, setImagen] = useState(null)
  const [nombre_slug, setNombre_slug] = useState("")

  const onSubmit = values => {
    delete values.aplicaciones
    values.aplicaciones = aplicaciones
    values.url = nombre_slug
    if (imagen === null) {
      setLoading(true)
      postCrearProductoApi(values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarlista(paginaactual)
          }
        })
    } else {
      setLoading(true)
      crearFotoProductoApi(imagen.file)
        .then(respuesta => {
          if (respuesta.ok === false) {
            setMessagePut(respuesta.message)
          } else {
            values.imagen = respuesta.imageName
            postCrearProductoApi(values)
              .then(respuesta => {
                setLoading(false)
                setMessagePut(respuesta.message)
                if (respuesta.ok) {
                  actualizarlista(paginaactual)
                }
              })
          }
        })
    }
  }
  const crearSlug = (e) => {
    const { value } = e.target
    const respuesta = string_to_slug(value)
    setNombre_slug(respuesta)

  }
  function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...aplicaciones];
    list[index][name] = value;
    setAplicaciones(list);
  }
  const restarItem = index => {
    const list = [...aplicaciones]
    list.splice(index, 1)
    setAplicaciones(list)
  }
  const sumarItem = (e) => {
    setAplicaciones([...aplicaciones, { marcaVehiculo: "5f8647e7017ddf2764fa8d8e", modeloVehiculo: "5f8649d5017ddf2764fa8d8f", años: [] }])
  }
  useEffect(() => {
    getListaMarcaVehiculoActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setmarcaVehiculosLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaModeloVehiculoActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setmodeloVehiculosLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaCategoriaActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setcategoriasLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaLadoVehiculoActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setladoVehiculoLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaMarcaProductoActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setmarcaProductoLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaUnidadesActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setunidadMedidaLista(lista.lista.docs)
        }
      })
  }, [])

  // ######### RETURN ############
  return (
    <Modal
      {...restoprops}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={
        () => {
          setMessagePut(false)
          setAplicaciones(
            [
              {
                marcaVehiculo: "5f8647e7017ddf2764fa8d8e",
                modeloVehiculo: "5f8649d5017ddf2764fa8d8f",
                años: []
              }
            ]
          )
          setNombre_slug("")
        }
      }
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Creando Productos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <Form.Row>
            <Form.Group as={Col}>
              < UploadImagen imagen={imagen} setImagen={setImagen} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={(e) => crearSlug(e)}
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
            <Form.Group as={Col}>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={nombre_slug}
                disabled
              // ref={register({
              //   required: {
              //     value: true,
              //     message: 'URL es requerido'
              //   }
              // })}
              />
              {
                errors.url && <span className='text-danger text-small d-block my-1'>{errors.url.message}</span>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                name="sku"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Codigo de barra</Form.Label>
              <Form.Control
                type="text"
                name="codigoBarra"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Codigo proveedor</Form.Label>
              <Form.Control
                type="text"
                name="codigoProveedor"
                ref={register()}
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Descripcion técnica</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcionTecnica"
                ref={register()}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                name="categoria"
                ref={register()}
              >
                <option defaultValue value={"5f85d9d152113218d483639b"}>Sin categoria</option>
                {
                  categoriasLista.length > 0 ?
                    categoriasLista.map((x, i) =>
                      x._id === "5f85d9d152113218d483639b" ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    "Cargando....."
                }
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Lado vehículo</Form.Label>
              <Form.Control
                as="select"
                name="ladoVehiculo"
                ref={register()}
              >
                <option defaultValue value={"5f84f63aea307c37ccec8a1e"}>No aplica</option>
                {
                  ladoVehiculoLista.length > 0 ?
                    ladoVehiculoLista.map((x, i) =>
                      x._id === "5f84f63aea307c37ccec8a1e" ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    "Cargando....."
                }
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Marca producto</Form.Label>
              <Form.Control
                as="select"
                name="marca"
                ref={register()}
              >
                <option defaultValue value={"5f85db4513c41c0704f27529"}>Sin marca</option>
                {
                  marcaProductoLista.length > 0 ?
                    marcaProductoLista.map((x, i) =>
                      x._id === "5f85db4513c41c0704f27529" ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    "Cargando....."
                }
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Unidad</Form.Label>
              <Form.Control
                as="select"
                name="unidad"
                ref={register()}
              >
                <option defaultValue value={"5f7e7890382e2a34e41e282e"}>Sin unidad</option>
                {
                  unidadMedidaLista.length > 0 ?
                    unidadMedidaLista.map((x, i) =>
                      x._id === "5f7e7890382e2a34e41e282e" ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    "Cargando....."
                }
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Alto</Form.Label>
              <Form.Control
                type="text"
                name="alto"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Ancho</Form.Label>
              <Form.Control
                type="text"
                name="ancho"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Largo</Form.Label>
              <Form.Control
                type="text"
                name="largo"
                ref={register()}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="text"
                name="peso"
                ref={register()}
              />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group as={Col}>
              <h6><strong>Aplicaciones</strong></h6>
            </Form.Group>
          </Form.Row>
          <hr />
          {
            aplicaciones.map((x, i) =>
              <div key={i}>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Control
                      as="select"
                      name="marcaVehiculo"
                      placeholder="marca de vehiculo"
                      value={x.marcaVehiculo}
                      onChange={e => handleInputChange(e, i)}
                      ref={register()}
                    >
                      <option defaultValue value={"5f8647e7017ddf2764fa8d8e"}>
                        Sin marca
                      </option>
                      {
                        marcaVehiculosLista.length > 0 ?
                          marcaVehiculosLista.map((xx, ii) =>
                            xx._id === "5f8647e7017ddf2764fa8d8e" ?
                              null :
                              <option key={ii} value={xx._id}>
                                {xx.nombre}
                              </option>
                          )
                          :
                          "Cargando....."
                      }
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    {
                      aplicaciones.length !== 1 &&
                      <Button
                        className="ml-5"
                        variant="outline-secondary"
                        onClick={() => { restarItem(i) }}
                      >
                        Borrar
                        </Button>
                    }
                    {
                      aplicaciones.length - 1 === i &&
                      <Button
                        className="ml-1"
                        variant="info"
                        onClick={sumarItem}
                      >
                        Agregar
                      </Button>
                    }
                  </Form.Group>
                </Form.Row>
                <Form.Row >
                  <Form.Group as={Col}>
                    <Form.Control
                      as="select"
                      name="modeloVehiculo"
                      placeholder="modelo de vehiculo"
                      value={x.modeloVehiculo}
                      onChange={e => handleInputChange(e, i)}
                      ref={register()}
                    >
                      <option defaultValue value={"5f8649d5017ddf2764fa8d8f"}>
                        Sin modelo
                      </option>
                      {
                        modeloVehiculosLista.length > 0 ?
                          modeloVehiculosLista.map((xx, ii) =>
                            xx._id === "5f8649d5017ddf2764fa8d8f" ?
                              null :
                              <option key={ii} value={xx._id}>
                                {xx.nombre}
                              </option>
                          )
                          :
                          "Cargando....."
                      }
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="años"
                      value={x.name}
                      placeholder="años de vehiculo"
                      onChange={e => handleInputChange(e, i)}
                    />
                  </Form.Group>
                </Form.Row>



                <hr />
              </div>
            )
          }
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
                <Button
                  type='submit'
                >
                  Crear Producto
                </Button>

            }
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer >
        {
          messagePut &&
          <>
            <Spinner animation="grow" variant="danger" /> <h3>{messagePut}</h3>
          </>
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
          <Image src={logo} roundedCircle className="img-vista-registro" />
          :
          <Image src={imagen ? imagen.preview : logo} roundedCircle className="img-vista-registro" />
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
export default React.memo(withRouter(ProductosData))  