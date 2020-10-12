import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Table, Modal, Button, Row, Col, Form, Spinner, Image } from 'react-bootstrap'
import { Pencil, ClipboardCheck, ClipboardX, Eye } from 'react-bootstrap-icons'
import { useForm } from 'react-hook-form'
import { ContextCategoriaProducto } from '../../../../../context/contextCategoriaProducto'
import { editarCategoriaApi, putActDesCategoriaApi, getListaCategoriaApi, getImagenApi, crearFotoCategoriaApi } from '../../../../../api/categoriaProducto'
import { useDropzone } from 'react-dropzone'


import logo from '../../../../../assets/logo-amarillo.png'
import '../CategoriaProducto.scss'


const DetalleCategoriaProducto = (props) => {
  const { state: { docs }, dispatch } = useContext(ContextCategoriaProducto)
  const { paginaActual } = props
  const [modalShow, setModalShow] = useState({ ver: false, txt: "" })
  const [modalShow2, setModalShow2] = useState({ ver: false, datos: "" })
  const [modalShow3, setModalShow3] = useState({ ver: false, informacion: "" })

  function actualizarLista() {
    getListaCategoriaApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_CATEGORIA_PRODUCTO", lista })
        }
      })
  }
  const editarRegistro = (y) => {
    setModalShow3({ ver: true, informacion: y })
  }
  const activarDesactivar = async (id, estado) => {
    const respuesta = await putActDesCategoriaApi(id, !estado)
    setModalShow({ ver: true, txt: respuesta.message })
    if (respuesta.ok) {
      actualizarLista(paginaActual)
    }
  }
  const verRegistro = (dat) => {
    setModalShow2({ ver: true, datos: dat })
  }
  const heads = ["Foto", "Nombre", "Acciones"]
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
                <td><ViewImage img={y.imagen} alt={y.nombre} /></td>
                <td>{y.nombre}</td>
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
          <Image src={image} rounded className={vista ? "img-categoria-producto-3" : "img-categoria-producto-2"} alt={alt} />
          :
          <Spinner animation="border" role="status"></Spinner>
      }
    </>
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
          {data.nombre} {data.activo ? " -> Activo" : " -> Inactivo"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <ViewImage img={data.imagen} alt={data.nombre} vista={true} />
          </Col>
          <Col>
            <strong>Nombre: </strong> {data.nombre}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <strong>Notas: </strong> {data.notas}
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
  const [imagen, setImagen] = useState(null)

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      nombre: informacion.nombre,
      notas: informacion.notas
    }
  })
  const onSubmit = values => {
    if (typeof imagen.file === "object") {
      setLoading(true)
      crearFotoCategoriaApi(imagen.file)
        .then(respuesta => {
          if (respuesta.ok === false) {
            setMessagePut(respuesta.message)
          } else {
            values.imagen = respuesta.imageName
            editarCategoriaApi(informacion._id, values)
              .then(respuesta => {
                setLoading(false)
                setMessagePut(respuesta.message)
                if (respuesta.ok) {
                  actualizarLista(paginaActual)
                }
              })
          }
        })
    } else {
      setLoading(true)
      editarCategoriaApi(informacion._id, values)
        .then(respuesta => {
          setLoading(false)
          setMessagePut(respuesta.message)
          if (respuesta.ok) {
            actualizarLista(paginaActual)
          }
        })
    }
  }
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
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editando categoria de productos:  <strong>{informacion.nombre}</strong>
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
                    message: 'Nombre es requerido'
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
          <Image src={logo} roundedCircle className="img-categoria-producto" />
          :
          <Image src={imagenUrl ? imagenUrl : logo} roundedCircle className="img-categoria-producto" />
      }
    </div>
  )
}
export default DetalleCategoriaProducto
