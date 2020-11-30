import React, { useState, useContext, useEffect } from 'react'
import { Col, OverlayTrigger, Row, Tooltip, Modal, Form, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { PlusCircle } from 'react-bootstrap-icons'
import { getListaIngresoProveedorApi, postIngresoProveedorApi } from '../../../../api/ingresosProveedor'
import { getListaSucursalesActivaApi } from '../../../../api/sucursales'
import { getListaProveedoresActivos } from '../../../../api/proveedor'
import { buscaProductoIngresoApi } from '../../../../api/productos'
import { ContextIngresoProveedor } from '../../../../context/contextIngresoProveedor'
import { getListaDocumentosActivosApi } from '../../../../api/documentos'
import { ContextUserContext } from '../../../../context/user/ContextUser'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination";
import ListaIngresosProveedores from './lista'
// import FormularioBusquedaUnidades from './formularioBusqueda'


const IngresoProveedorIngresos = (props) => {
  const { state: { docs, busqueda, actualizando, limit, total }, dispatch } = useContext(ContextIngresoProveedor)
  const { usuario: { sucursal_nombre, sucursal_id, perfil_valor } } = useContext(ContextUserContext)
  const { location, history } = props
  const { page = 1 } = queryString.parse(location.search)
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [sucursalActiva, setSucursalActiva] = useState(sucursal_id)
  const [sucursalA, setSucursalA] = useState([])
  const [products, setProducts] = useState([])


  function handlePageChange(pageNumber) {
    history.push(`${location.pathname}?page=${pageNumber}`)
  }
  const cambioSucursal = (e) => {
    const { value } = e.target
    setSucursalActiva(value)
  }
  function actualizarLista(page) {
    getListaIngresoProveedorApi(page, 10, sucursalActiva)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_INGRESO_PROVEEDOR", lista })
        }
      })
  }
  useEffect(() => {
    getListaSucursalesActivaApi(page, 1000000000)
      .then(result => {
        setSucursalA(result.lista.docs)
      })
    // if (perfil_valor === 1) {
    //   getListaSucursalesApi(page, 1000000000)
    //     .then(result => {
    //       setSucursalA(result.lista.docs)
    //     })
    // } else {
    //   getListaSucursalesActivaApi(page, 1000000000)
    //     .then(result => {
    //       setSucursalA(result.lista.docs)
    //     })
    // }
    // getListaProductoApi2(page, 1000000000)
    //   .then(result => {
    //     // console.log("LISTA DE PRODUCTOS DE PRUEBA", result);
    //   })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfil_valor])
  useEffect(() => {
    actualizarLista(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sucursalActiva])
  if (busqueda) {
    return (
      <div>
        <Row className=" d-flex align-content-center ">
          <h2>Lista Ingresos por Proveedor</h2>
          <Col>
            <Form.Control
              as="select"
              name="sucursal_id"
              onChange={e => cambioSucursal(e)}
            >
              <option defaultValue value={sucursal_id}>{sucursal_nombre}</option>
              {
                sucursalA.length > 0 &&

                sucursalA.map((x, i) =>
                  <option value={x._id} key={i}>{x.nombre}</option>
                )
              }
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            {/* <FormularioBusquedaUnidades paginaActual={page} /> */}
            Formulario busqueda
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
                  <ListaIngresosProveedores paginaActual={page} />
                </Col>
              </Row>
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
            productos={products}
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
      <Row className=" d-flex align-content-center ">
        <h2>Lista Ingresos por Proveedor</h2>
        <Col>
          <Form.Control
            as="select"
            name="sucursal_id"
            disabled={perfil_valor === 1 ? false : true}
            onChange={e => cambioSucursal(e)}
          >
            <option defaultValue value={sucursal_id}>{sucursal_nombre}</option>
            {
              sucursalA.length > 0 &&

              sucursalA.map((x, i) =>
                <option value={x._id} key={i}>{x.nombre}</option>
              )
            }
          </Form.Control>
        </Col>
      </Row>
      {
        actualizando ?
          <>
            <Spinner animation="border" role="status"></Spinner>
          </>
          :
          <>
            <Row>
              <Col xs={10}>
                {/* <FormularioBusquedaUnidades paginaActual={page} /> */}
                Formulario Busqueda
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
                <ListaIngresosProveedores
                  paginaActual={page}
                  sucursalactiva={sucursalActiva}
                />
              </Col>
            </Row>
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

          </>
      }
      {
        nuevoRegistro &&
        <CrearRegistro
          show={nuevoRegistro}
          onHide={() => setNuevoRegistro(false)}
          actualizarlista={actualizarLista}
          paginaactual={page}
          sucursales={sucursalA}
          sucursal={sucursal_id}
          sucursalnombre={sucursal_nombre}
          perfil={perfil_valor}
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
  const { actualizarlista, paginaactual, sucursales, perfil, sucursal, sucursalnombre, ...restoprops } = props
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const { register, errors, handleSubmit } = useForm()
  const [detalle, setDetalle] = useState(null)
  const [totalIngreso, setTotalIngreso] = useState(0)
  const [proveedor, setProveedor] = useState([])
  const [documentos, setDocumentos] = useState([])
  const [productosBusqueda, setProductosBusqueda] = useState([])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...detalle]
    list[index][name] = value
    setDetalle(list)
  }
  const calcularSubTotal = i => {
    const list = [...detalle]
    const precio = parseInt(list[i].precioCosto)
    const cantidad = parseInt(list[i].cantidad)
    const subtotal = precio * cantidad
    list[i].precioTotal = subtotal
    setDetalle(list)
    let st = 0
    for (let index = 0; index < list.length; index++) {
      st = list[index].precioTotal + st
    }
    setTotalIngreso(st)
  }
  const restarItem = index => {
    const list = [...detalle]
    list.splice(index, 1)
    setDetalle(list)
  }
  const sumarItem = (id, nombre) => {
    console.log("en funcion sumarItem")

    if (detalle === null) {
      setDetalle([
        {
          producto: id,
          nombreproducto: nombre,
          cantidad: 0,
          precioCosto: 0,
          precioTotal: 0,
          ubicacion: null,
          notas: null
        }
      ])
    } else {
      setDetalle([...detalle, {
        producto: id,
        nombreproducto: nombre,
        cantidad: 0,
        precioCosto: 0,
        precioTotal: 0,
        ubicacion: null,
        notas: null
      }])
    }
  }
  const onSubmit = values => {
    setLoading(true)
    if (perfil !== 1) {
      values.sucursal = sucursal
    }
    delete values.detalle
    delete values.cantidad
    delete values.precioCosto
    values.detalle = detalle
    values.totalIngreso = totalIngreso
    postIngresoProveedorApi(values)
      .then(respuesta => {
        setLoading(false)
        setMessagePut(respuesta.message)
        if (respuesta.ok) {
          actualizarlista(paginaactual)
        }
      })
  }
  async function buscando(e) {
    if (e.target.value === undefined || e.target.value === "" || e.target.value === null) {
      return null
    } else {
      try {
        const busqueda = await buscaProductoIngresoApi(e.target.value)
        setProductosBusqueda(busqueda.lista.docs)
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getListaProveedoresActivos(1, 1000000000)
      .then(respuesta => {
        if (respuesta.ok === false) {
          setMessagePut(respuesta.message)
        } else {
          setProveedor(respuesta.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaDocumentosActivosApi(1, 1000000000)
      .then(respuesta => {
        if (respuesta.ok === false) {
          setMessagePut(respuesta.message)
        } else {
          setDocumentos(respuesta.lista.docs)
        }
      })
  }, [])
  return (
    <Modal
      {...restoprops}
      size="xl" //lg sm xl
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      scrollable="true"
      onExit={() => setMessagePut(false)}

    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ingreso de Productos por Proveedor //
          Total: {new Intl.NumberFormat("es-ES", { style: "currency", currency: "CLP" }).format(totalIngreso)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          {/* Parte superior del formulario */}
          <>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Sucursal</Form.Label>
                <Form.Control
                  as="select"
                  name="sucursal"
                  disabled={perfil === 1 ? false : true}
                  ref={register({
                    required: {
                      value: true,
                      message: '*'
                    }
                  })}
                >
                  <option defaultValue value={sucursal}>{sucursalnombre}</option>
                  {
                    sucursales.length > 0 &&

                    sucursales.map((x, i) =>
                      <option value={x._id} key={i}>{x.nombre}</option>
                    )
                  }
                </Form.Control>
                {
                  errors.sucursal && <span className='text-danger text-small d-block my-1'>{errors.sucursal.message}</span>
                }
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Proveedor</Form.Label>
                <Form.Control
                  as="select"
                  name="proveedor"
                  disabled={proveedor.length > 0 ? false : true}
                  ref={register({
                    required: {
                      value: true,
                      message: '*'
                    }
                  })}
                >
                  <option defaultValue value="">
                    {
                      proveedor.length > 0 ?
                        "Selecciona proveedor"
                        :
                        "Cargando lista..."
                    }
                  </option>
                  {
                    proveedor.length > 0 &&

                    proveedor.map((x, i) =>
                      <option value={x._id} key={i}>{x.nombre}</option>
                    )
                  }
                </Form.Control>
                {
                  errors.proveedor && <span className='text-danger text-small d-block my-1'>{errors.proveedor.message}</span>
                }
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Documento</Form.Label>
                <Form.Control
                  as="select"
                  name="documento"
                  disabled={documentos.length > 0 ? false : true}
                  ref={register({
                    required: {
                      value: true,
                      message: '*'
                    }
                  })}
                >
                  <option defaultValue value="">
                    {
                      documentos.length > 0 ?
                        "Selecciona documentos"
                        :
                        "Cargando lista..."
                    }
                  </option>
                  {
                    documentos.length > 0 &&
                    documentos.map((x, i) =>
                      <option value={x._id} key={i}>{x.nombre}</option>
                    )
                  }
                </Form.Control>
                {
                  errors.documento && <span className='text-danger text-small d-block my-1'>{errors.documento.message}</span>
                }
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>N° Documento</Form.Label>
                <Form.Control
                  type="text"
                  name="numeroDocumento"
                  ref={register({
                    required: {
                      value: true,
                      message: 'Campo obligatorio'
                    }
                  })}
                />
                {
                  errors.numeroDocumento && <span className='text-danger text-small d-block my-1'>{errors.numeroDocumento.message}</span>
                }
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Fecha Documento</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  ref={register({
                    required: {
                      value: false,
                      message: 'Campo obligatorio'
                    }
                  })}
                />
                {
                  errors.fecha && <span className='text-danger text-small d-block my-1'>{errors.fecha.message}</span>
                }
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Notas</Form.Label>
                <Form.Control
                  as="textarea"
                  name="notas"
                  ref={register({
                    required: {
                      value: false,
                    }
                  })}
                />
              </Form.Group>
            </Form.Row>

          </>
          <hr />
          {/* Parte inferior del formulario */}
          <>
            <Form.Row>
              <Form.Group as={Col} className='bg-dark text-white p-2'>
                <h6><strong>Detalle de ingreso</strong></h6>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="col-md-3 border-right">
                <strong>Busqueda de Productos</strong>
                <Form.Control
                  type="text"
                  name="skuproveedorbarra"
                  size='sm'
                  className="mb-1"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      buscando(e)
                    }
                  }}
                />
                <strong>Resultado busqueda</strong>
                {
                  productosBusqueda.length > 0 &&
                  <Form.Control
                    as="select"
                    htmlSize={10}
                    custom
                    className="overflow-auto"

                  >
                    {
                      productosBusqueda.map((x, i) =>
                        <option
                          value={x._id}
                          key={i}
                          onClick={() => sumarItem(x._id, x.nombre)}
                        >
                          {x.nombre}
                        </option>
                      )
                    }
                  </Form.Control>
                }
              </Form.Group>
              <Form.Group as={Col} className="col-md-9">
                <strong>Productos en ingreso</strong>
                {
                  detalle === null ?
                    null
                    :
                    detalle.map((x, i) =>
                      <Form.Row key={i} onChange={e => calcularSubTotal(i)}>
                        <Form.Group as={Col} className="col-md-6">
                          <Form.Control
                            as="select"
                            disabled
                            custom
                            size='sm'
                          >
                            <option
                              value={x.producto}
                              key={i}
                            >
                              {x.nombreproducto}
                            </option>
                          </Form.Control>
                          {
                            errors.producto && <span className='text-danger text-small d-block my-1'>{errors.producto.message}</span>
                          }
                          {/* <strong>{x.nombreproducto}</strong> */}
                        </Form.Group>
                        <Form.Group as={Col} className="col-md-1">
                          <Form.Control
                            placeholder="Cantidad"
                            type="number"
                            name="cantidad"
                            size='sm'
                            // defaultValue
                            value={x.cantidad}
                            onChange={e => handleInputChange(e, i)}
                            ref={register({
                              required: {
                                value: true,
                                message: '*'
                              }
                            })}
                          />
                          {
                            errors.cantidad && <span className='text-danger text-small d-block my-1'>{errors.cantidad.message}</span>
                          }
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Control
                            placeholder="Precio"
                            type="number"
                            name="precioCosto"
                            size='sm'
                            value={x.precioCosto}
                            onChange={e => handleInputChange(e, i)}
                            ref={register({
                              required: {
                                value: true,
                                message: '*'
                              }
                            })}
                          />
                          {
                            errors.precioCosto && <span className='text-danger text-small d-block my-1'>{errors.precioCosto.message}</span>
                          }
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Control
                            placeholder="Total"
                            type="number"
                            name="precioTotal"
                            size='sm'
                            value={x.precioTotal}
                            disabled
                            ref={register({
                              required: {
                                value: false,
                                message: '*'
                              }
                            })}
                          />
                          {
                            errors.precioTotal && <span className='text-danger text-small d-block my-1'>{errors.precioTotal.message}</span>
                          }
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Control
                            placeholder="Ubicación"
                            type="text"
                            name="ubicacion"
                            size='sm'
                            onChange={e => handleInputChange(e, i)}
                            ref={register({
                              required: {
                                value: false,
                                message: '*'
                              }
                            })}
                          />
                          {
                            errors.ubicacion && <span className='text-danger text-small d-block my-1'>{errors.ubicacion.message}</span>
                          }
                        </Form.Group>
                        <Form.Group >
                          {
                            detalle.length !== 1 &&
                            <Button
                              variant="outline-secondary"
                              size='sm'
                              onClick={() => { restarItem(i) }}
                            >
                              -
                        </Button>
                          }
                        </Form.Group>
                      </Form.Row>
                    )
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
          </>
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
export default React.memo(withRouter(IngresoProveedorIngresos))  