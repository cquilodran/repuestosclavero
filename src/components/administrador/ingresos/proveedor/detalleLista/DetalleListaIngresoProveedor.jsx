import React, { useState, useContext, useEffect } from 'react'
import { Table, Modal, Button, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { ContextIngresoProveedor } from '../../../../../context/contextIngresoProveedor'
import { putActDesIngresoProveedorApi, getListaIngresoProveedorApi, editarIngresoProveedorApi } from '../../../../../api/ingresosProveedor'
import { getListaSucursalesActivaApi } from '../../../../../api/sucursales'
import { getListaProveedoresActivos } from '../../../../../api/proveedor'
import { getListaDocumentosActivosApi } from '../../../../../api/documentos'
import { buscaProductoIngresoApi } from '../../../../../api/productos'
import { ContextUserContext } from '../../../../../context/user/ContextUser'



const DetalleListaIngresoProveedor = (props) => {
  const { state: { docs }, dispatch } = useContext(ContextIngresoProveedor)
  const { usuario: { sucursal_nombre, sucursal_id, perfil_valor } } = useContext(ContextUserContext)
  const { paginaActual, sucursalactiva } = props
  const [modalShow, setModalShow] = useState({ ver: false, txt: "" })
  const [modalShow2, setModalShow2] = useState({ ver: false, datos: "" })
  const [modalShow3, setModalShow3] = useState({ ver: false, informacion: "" })

  function actualizarLista(page) {
    getListaIngresoProveedorApi(page, 10, sucursalactiva)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_INGRESO_PROVEEDOR", lista })
        }
      })
  }
  const editarRegistro = (y) => {
    setModalShow3({ ver: true, informacion: y })
  }
  const activarDesactivar = async (id, estado) => {
    const respuesta = await putActDesIngresoProveedorApi(id, !estado, null, sucursalactiva)
    setModalShow({ ver: true, txt: respuesta.message })
    if (respuesta.ok) {
      actualizarLista(paginaActual)
    }
  }
  const verRegistro = (dat) => {
    setModalShow2({ ver: true, datos: dat })
  }
  const heads = ["Fecha", "Proveedor", "Documento", "N° doc", "Acciones"]
  const cf = (fech) => {
    const d = new Date(fech)
    return ((d.getDate() + 1) + "/" + (d.getMonth() + 1) + "/" + d.getFullYear())
  }
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
              <tr key={z} className="cursor-pointer ">
                <td onClick={() => verRegistro(y)}>{cf(y.fecha)}</td>
                <td onClick={() => verRegistro(y)}>{y.proveedor.nombre}</td>
                <td onClick={() => verRegistro(y)}>{y.documento.nombre}</td>
                <td onClick={() => verRegistro(y)}>{y.numeroDocumento}</td>
                <td onClick={() => editarRegistro(y)}>
                  <Pencil
                    width="1.5em"
                    size="1.5em"
                  />
                </td>
                <td
                  onClick={() => activarDesactivar(y._id, y.activo)}
                >
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onChange={() => { }}
                    checked={y.activo}
                    name="activo"
                    disabled
                  />
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
      {
        modalShow.ver &&
        <ModalMensajes
          show={modalShow.ver}
          txt={modalShow.txt}
          onHide={() => setModalShow({ ver: false, txt: "" })}
        />
      }
      {
        modalShow2.ver &&
        <VerRegisto
          show={modalShow2.ver}
          onHide={() => setModalShow2({ ver: false, datos: "" })}
          data={modalShow2.datos}
        />
      }
      {
        modalShow3.ver ?
          <EditarRegistro
            show={modalShow3.ver}
            informacion={modalShow3.informacion}
            actualizarlista={actualizarLista}
            onHide={() => setModalShow3({ ver: false, informacion: "" })}
            paginaactual={paginaActual}
            // sucursales={sucursalA}
            sucursal={sucursal_id}
            sucursalnombre={sucursal_nombre}
            perfil={perfil_valor}
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
  const cf = (fech) => {
    const d = new Date(fech)
    return ((d.getDate() + 1) + "/" + (d.getMonth() + 1) + "/" + d.getFullYear())
  }
  const fecc = new Intl.NumberFormat("es-ES", { style: "currency", currency: "CLP" })
  return (
    <Modal
      {...props}
      size="xl" //lg sm xl
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"
    >
      <Modal.Header closeButton className={data.activo ? "bg-success text-white" : "bg-danger text-white"} >
        <Modal.Title id="contained-modal-title-vcenter">
          Ingreso de Productos por Proveedor //
          Total: {`$ ${fecc.format(data.totalIngreso)}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Sucursal</Form.Label>
              <Form.Control
                type="text"
                name="sucursal"
                disabled={true}
                value={data.sucursal.nombre}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                name="proveedor"
                disabled={true}
                value={data.proveedor.nombre}
              >
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Documento</Form.Label>
              <Form.Control
                type="text"
                name="documento"
                disabled={true}
                value={data.documento.nombre}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>N° Documento</Form.Label>
              <Form.Control
                type="text"
                name="numeroDocumento"
                disabled={true}
                value={data.numeroDocumento}
              >
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Fecha Documento</Form.Label>
              <Form.Control
                type="text"
                name="fecha"
                disabled={true}
                value={cf(data.fecha)}
              >
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                name="notas"
                disabled={true}
                value={data.notas}
              >
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className='bg-dark text-white p-2'>
              <h6><strong>Detalle de ingreso</strong></h6>
            </Form.Group>
          </Form.Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {
                data.detalle.map((x, ii) =>
                  <tr key={ii}>
                    <th>{x.producto.nombre}</th>
                    <th>{x.cantidad}</th>
                    <th>{`$ ${fecc.format(x.precioCosto)}`}</th>
                    <th>{`$ ${fecc.format(x.precioTotal)}`}</th>
                    <th>{x.ubicacion}</th>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
function EditarRegistro(props) {
  const { informacion, actualizarlista, paginaactual, sucursal, sucursalnombre, perfil, ...otrasprops } = props
  const [totalIngreso2, setTotalIngreso2] = useState(informacion.totalIngreso)
  const cf2 = (fech) => {
    const d = new Date(fech)
    return (d.getFullYear() + "-" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" + ((d.getDate() + 1) < 10 ? "0" + (d.getDate() + 1) : (d.getDate() + 1)))
  }
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      numeroDocumento: informacion.numeroDocumento,
      fecha: cf2(informacion.fecha),
      notas: informacion.notas,
    }
  })
  function detall(datas) {
    const data = []
    datas.forEach(element => {
      data.push({
        producto: element.producto._id,
        nombre: element.producto.nombre,
        cantidad: element.cantidad,
        precioCosto: element.precioCosto,
        precioTotal: element.precioTotal,
        ubicacion: element.ubicacion,
        notas: element.notas
      })
    })
    setDetalle(data)
  }
  const [detalle, setDetalle] = useState([])
  const [productosBusqueda, setProductosBusqueda] = useState([])
  const [sucursalLista, setSucursalLista] = useState([])
  const [proveedorLista, setProveedorLista] = useState([])
  const [documentoLista, setDocumentoLista] = useState([])
  const onSubmit = values => {
    if (perfil !== 1) {
      values.sucursal = sucursal
    }
    let status = true
    detalle.forEach(function (det) {
      if (det.cantidad < 1 || det.precioCosto < 1) {
        status = false
      }
    })
    if (status) {
      delete values.detalle
      delete values.cantidad
      delete values.precioCosto
      delete values.precioTotal
      values.detalle = detalle
      values.totalIngreso = totalIngreso2
      setLoading(true)
      editarIngresoProveedorApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarlista(paginaactual)
          }
          setTimeout(() => {
            setMessagePut(false)
          }, 10000)
        })
    } else {
      setLoading(false)
      setMessagePut("Cantidad y precios mayor a cero")
      setTimeout(() => {
        setMessagePut(false)
      }, 3000)
    }
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
    setTotalIngreso2(st)
  }
  const restarItem = index => {
    const list = [...detalle]
    list.splice(index, 1)
    setDetalle(list)
  }
  const sumarItem = (id, nombre) => {
    if (detalle === null) {
      setDetalle([
        {
          producto: id,
          nombre: nombre,
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
        nombre: nombre,
        cantidad: 0,
        precioCosto: 0,
        precioTotal: 0,
        ubicacion: null,
        notas: null
      }])
    }
  }
  const fecc = new Intl.NumberFormat("es-ES", { style: "currency", currency: "CLP" })
  useEffect(() => {
    detall(informacion.detalle)
  }, [informacion])
  useEffect(() => {
    getListaSucursalesActivaApi(paginaactual, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setSucursalLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaProveedoresActivos(paginaactual, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setProveedorLista(lista.lista.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaDocumentosActivosApi(paginaactual, 1000)
      .then(lista => {
        if (lista.ok === false) {
          setMessagePut(lista.message)
        } else {
          setDocumentoLista(lista.lista.docs)
        }
      })
  }, [])
  return (
    <Modal
      {...otrasprops}
      size="xl" //lg sm xl
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      scrollable="true"
      onExit={() => setMessagePut(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editando Ingreso // Total: {`$ ${fecc.format(totalIngreso2)}`}
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
                <option defaultValue value={informacion.sucursal._id}>{informacion.sucursal.nombre}</option>
                {
                  sucursalLista.length > 0 &&

                  sucursalLista.map((x, i) =>
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
                disabled={proveedorLista.length > 0 ? false : true}
                ref={register({
                  required: {
                    value: true,
                    message: '*'
                  }
                })}
              >
                <option defaultValue value={informacion.proveedor._id}>{informacion.proveedor.nombre}</option>
                {
                  proveedorLista.length > 0 &&

                  proveedorLista.map((x, i) =>
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
                disabled={proveedorLista.length > 0 ? false : true}
                ref={register({
                  required: {
                    value: true,
                    message: '*'
                  }
                })}
              >
                <option defaultValue value={informacion.documento._id}>{informacion.documento.nombre}</option>
                {
                  documentoLista.length > 0 &&

                  documentoLista.map((x, i) =>
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
                    message: '*'
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
                    value: true,
                    message: '*'
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
          <hr />
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
                            {x.nombre}
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
  );
}
export default React.memo(DetalleListaIngresoProveedor)
