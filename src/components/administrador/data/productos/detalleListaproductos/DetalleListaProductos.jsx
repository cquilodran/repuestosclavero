import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Table, Modal, Button, Row, Col, Form, Spinner, Image } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { ContextProductos } from '../../../../../context/contextProductos'
import { editarProductoApi, putActDesProductoApi, getListaProductoApi, getImagenApi, crearFotoProductoApi } from '../../../../../api/productos'
import { getListaMarcaVehiculoActivoApi } from '../../../../../api/marcaVehiculo'
import { getListaModeloVehiculoActivoApi } from '../../../../../api/modeloVehiculo'
import { getListaCategoriaActivoApi } from '../../../../../api/categoriaProducto'
import { getListaLadoVehiculoActivoApi } from '../../../../../api/ladoVehiculo'
import { getListaMarcaProductoActivoApi } from '../../../../../api/marcaProducto'
import { getListaUnidadesActivoApi } from '../../../../../api/unidades'
import { useDropzone } from 'react-dropzone'

import logo from '../../../../../assets/logo-amarillo.png'

const DetalleListaProductos = (props) => {
  const { state: { docs }, dispatch } = useContext(ContextProductos)
  const { paginaActual } = props
  const [modalShow, setModalShow] = useState({ ver: false, txt: "" })
  const [modalShow2, setModalShow2] = useState({ ver: false, datos: "" })
  const [modalShow3, setModalShow3] = useState({ ver: false, informacion: "" })

  function actualizarLista() {
    getListaProductoApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PRODUCTOS", lista })
        }
      })
  }
  const editarRegistro = (y) => {
    setModalShow3({ ver: true, informacion: y })
  }
  const activarDesactivar = async (id, estado) => {
    const respuesta = await putActDesProductoApi(id, !estado)
    setModalShow({ ver: true, txt: respuesta.message })
    if (respuesta.ok) {
      actualizarLista(paginaActual)
    }
  }
  const verRegistro = (dat) => {
    setModalShow2({ ver: true, datos: dat })
  }
  const heads = ["Foto", "Nombre", "Catgoria", "SKU", "Acciones"]
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
              <tr
                key={z}
                className="cursor-pointer "
              >
                <td onClick={() => verRegistro(y)}>
                  <ViewImage img={y.imagen} alt={y.nombre} />
                </td>
                <td onClick={() => verRegistro(y)}>{y.nombre}</td>
                <td onClick={() => verRegistro(y)}>{y.categoria.nombre}</td>
                <td onClick={() => verRegistro(y)}>{y.sku}</td>
                {/* <td onClick={() => verRegistro(y)}>{y.inventario}</td> */}
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
        modalShow3.ver &&
        <EditarRegistro
          show={modalShow3.ver}
          informacion={modalShow3.informacion}
          actualizarlista={actualizarLista}
          onHide={() => setModalShow3({ ver: false, informacion: "" })}
          paginaactual={paginaActual}
        />
      }
    </div>
  )
}
// ######################
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
  if (!data) {
    return (null)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className={data.activo ? "bg-success text-white" : "bg-danger text-white"}
      >
        <Modal.Title id="contained-modal-title-vcenter" >
          {data.nombre}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ViewImage img={data.imagen} alt={data.nombre} vista={true} />
          </Col>
          <Col>
            <Row>
              <Col>
                <strong>URL: </strong>{data.url}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <strong>SKU: </strong>  {data.sku}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <strong>Código: </strong>{data.codigoBarra}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <strong>Código proveedor: </strong> {data.codigoProveedor}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <strong>Descripción: </strong>
            <p className="text-break">{data.descripcion}</p>
          </Col>
          <Col>
            <strong>Descripción técnica: </strong>
            <p className="text-break">{data.descripcionTecnica}</p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>Categoría: </strong>
            <p className="text-break">
              {data.categoria.nombre}
            </p>
          </Col>
          <Col>
            <strong>Lado Vehículo: </strong>
            <p className="text-break">
              {data.ladoVehiculo.nombre}
            </p>
          </Col>
          <Col>
            <strong>Marca Producto: </strong>
            <p className="text-break">
              {data.marca.nombre}
            </p>
          </Col>
          <Col>
            <strong>Unidad: </strong>
            <p className="text-break">
              {data.unidad.nombre}
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>Alto: </strong>
            <p className="text-break">
              {data.alto}
            </p>
          </Col>
          <Col>
            <strong>Ancho: </strong>
            <p className="text-break">
              {data.ancho}
            </p>
          </Col>
          <Col>
            <strong>Largo: </strong>
            <p className="text-break">
              {data.largo}
            </p>
          </Col>
          <Col>
            <strong>Peso: </strong>
            <p className="text-break">
              {data.peso}
            </p>
          </Col>
        </Row>
        <hr />
        {/* Aplicaciones */}
        <Row>
          <Col>
            <strong className="text-uppercase">Aplicaciones</strong>
          </Col>
        </Row>
        <br />
        {
          data.aplicaciones.length > 0 &&

          data.aplicaciones.map((aplicacion, index) =>
            <div key={index}>
              <Row >
                <Col>
                  <strong>Vehículo: </strong>
                  <p className="text-break">
                    {aplicacion.marcaVehiculo.nombre}
                  </p>
                </Col>
              </Row>
              <Row >
                <Col md={6}>
                  <strong>Modelo: </strong>
                  <p className="text-break">
                    {aplicacion.modeloVehiculo.nombre}
                  </p>
                </Col>
                <Col md={6} >
                  <strong>Años: </strong>
                  <p className="text-break">
                    {aplicacion.años}
                  </p>
                </Col>
              </Row>
              {
                data.aplicaciones.length - 1 !== index && <hr />
              }
            </div>
          )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-dark">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
function EditarRegistro(props) {
  const { informacion, actualizarlista, paginaactual, ...otrasprops } = props
  // console.log(informacion);
  const [loading, setLoading] = useState(false)
  const [messagePut, setMessagePut] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      nombre: informacion.nombre,
      url: informacion.url,
      sku: informacion.sku,
      codigo: informacion.codigoBarra,
      codigoProveedor: informacion.codigoProveedor,
      codigoBarra: informacion.codigoBarra,
      descripcion: informacion.descripcion,
      descripcionTecnica: informacion.descripcionTecnica,
      alto: informacion.alto,
      ancho: informacion.ancho,
      largo: informacion.largo,
      peso: informacion.peso,
      // inventario: informacion.inventario,
      // ecommerce: informacion.ecommerce
    }
  })
  const [marcaVehiculosLista, setmarcaVehiculosLista] = useState([])
  const [modeloVehiculosLista, setmodeloVehiculosLista] = useState([])
  const [categoriasLista, setcategoriasLista] = useState([])
  const [ladoVehiculoLista, setladoVehiculoLista] = useState([])
  const [marcaProductoLista, setmarcaProductoLista] = useState([])
  const [unidadMedidaLista, setunidadMedidaLista] = useState([])
  const [aplicaciones, setAplicaciones] = useState(informacion.aplicaciones)
  const [imagen, setImagen] = useState(null)
  const [nombre_slug, setNombre_slug] = useState(informacion.url)

  const onSubmit = values => {
    delete values.aplicaciones
    values.aplicaciones = aplicaciones
    values.url = nombre_slug

    if (imagen === null) {
      setLoading(true)
      editarProductoApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarlista(paginaactual)
          }
        })
    } else if (imagen.file) {
      setLoading(true)
      crearFotoProductoApi(imagen.file)
        .then(respuesta => {
          if (respuesta.ok === false) {
            setMessagePut(respuesta.message)
          } else {
            values.imagen = respuesta.imageName
            editarProductoApi(informacion._id, values)
              .then(respuesta => {
                setLoading(false)
                setMessagePut(respuesta.message)
                if (respuesta.ok) {
                  actualizarlista(paginaactual)
                }
              })
          }
        })
    } else {
      setLoading(true)
      editarProductoApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarlista(paginaactual)
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
    list[index].nuevo = false
    setAplicaciones(list);
  }
  const restarItem = index => {
    const list = [...aplicaciones]
    list.splice(index, 1)
    setAplicaciones(list)
  }
  const sumarItem = (e) => {
    setAplicaciones([...aplicaciones, { marcaVehiculo: "5f8647e7017ddf2764fa8d8e", modeloVehiculo: "5f8649d5017ddf2764fa8d8f", años: [], nuevo: true }])
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
  useEffect(() => {
    if (informacion.imagen) {
      getImagenApi(informacion.imagen)
        .then(response => {
          if (response.ok === false) {
            setMessagePut(response.message)
          } else {
            setImagen(response)
          }
        })
    } else {
      setImagen(null)
    }
  }, [informacion])
  return (
    <Modal
      {...otrasprops}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editando Producto:  <strong>{informacion.nombre}</strong>
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
                <option defaultValue value={informacion.categoria._id}>
                  {informacion.categoria.nombre}
                </option>

                {
                  categoriasLista.length > 0 ?
                    categoriasLista.map((x, i) =>
                      x._id === informacion.categoria._id ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    <option >Cargando....</option>
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
                <option defaultValue value={informacion.ladoVehiculo._id}>
                  {informacion.ladoVehiculo.nombre}
                </option>
                {
                  ladoVehiculoLista.length > 0 ?
                    ladoVehiculoLista.map((x, i) =>
                      x._id === informacion.ladoVehiculo._id ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    <option >Cargando....</option>
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
                <option defaultValue value={informacion.marca._id}>
                  {informacion.marca.nombre}
                </option>
                {
                  marcaProductoLista.length > 0 ?
                    marcaProductoLista.map((x, i) =>
                      x._id === informacion.marca._id ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    <option >Cargando....</option>
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
                <option defaultValue value={informacion.unidad._id}>
                  {informacion.unidad.nombre}
                </option>
                {
                  unidadMedidaLista.length > 0 ?
                    unidadMedidaLista.map((x, i) =>
                      x._id === informacion.unidad._id ?
                        null :
                        <option key={i} value={x._id}>
                          {x.nombre}
                        </option>
                    )
                    :
                    <option >Cargando....</option>
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
                      // value={x.marcaVehiculo}
                      onChange={e => handleInputChange(e, i)}
                      ref={register()}
                    >
                      <option
                        defaultValue
                        velued={
                          x.nuevo ?
                            aplicaciones[i].marcaVehiculo
                            :
                            aplicaciones[i].marcaVehiculo._id
                        }
                      >
                        {
                          x.nuevo ?
                            "Sin Marca"
                            :
                            aplicaciones[i].marcaVehiculo.nombre
                        }
                      </option>
                      {
                        marcaVehiculosLista.length > 0 ?
                          marcaVehiculosLista.map((xx, ii) =>
                            <option key={ii} value={xx._id}>
                              {xx.nombre}
                            </option>
                          )
                          :
                          <option >Cargando....</option>
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
                      // value={x.modeloVehiculo}
                      onChange={e => handleInputChange(e, i)}
                      ref={register()}
                    >
                      <option defaultValue
                        value={
                          x.nuevo ?
                            aplicaciones[i].modeloVehiculo
                            :
                            aplicaciones[i].modeloVehiculo._id
                        }
                      >
                        {
                          x.nuevo ?
                            "Sin modelo"
                            :
                            aplicaciones[i].modeloVehiculo.nombre
                        }
                      </option>
                      {
                        modeloVehiculosLista.length > 0 ?
                          modeloVehiculosLista.map((xx, ii) =>
                            <option key={ii} value={xx._id}>
                              {xx.nombre}
                            </option>
                          )
                          :
                          <option >Cargando....</option>
                      }
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Control
                      name="años"
                      value={x.años}
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
                <Button type='submit'>Actualizar</Button>

            }
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer >
        {
          messagePut &&
          <>
            <Spinner animation="grow" variant="warning" /> <h3>{messagePut}</h3>
          </>
        }
        <Button onClick={props.onHide}>Cancelar / Salir</Button>
      </Modal.Footer>
    </Modal>
  );
}
function ViewImage(props) {
  const { img, alt, vista = false } = props
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (img) {
      getImagenApi(img)
        .then(foto => {
          if (foto.ok) {
            setImage(foto.url)
          } else {
            setImage(logo)
          }
        })
    } else {
      setImage(logo)
    }
  }, [img])
  return (
    <>
      {
        image ?
          <Image src={image} rounded className={vista ? "img-vista-registro-3 " : "img-vista-registro-2"} alt={alt} />
          :
          <Spinner animation="border" role="status"></Spinner>
      }
    </>
  )
}
function UploadImagen(props) {
  const { imagen, setImagen } = props
  const [imagenUrl, setimagenUrl] = useState(null)


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
  useEffect(() => {
    if (imagen) {
      if (imagen.preview) {
        setimagenUrl(imagen.preview)
      } else {
        setimagenUrl(imagen.url)
      }
    } else {
      setimagenUrl(null)
    }
  }, [imagen])
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <Image src={logo} className="img-vista-registro" />
          :
          <Image src={imagenUrl ? imagenUrl : logo} className="img-vista-registro" />
      }
    </div>
  )
}
export default React.memo(DetalleListaProductos)
