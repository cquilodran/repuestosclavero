import React, { useEffect, useState, useContext } from 'react'
import { Modal, Button, Spinner, Form, Col } from 'react-bootstrap'
import DetalleListaProveedoresDataProveedores from '../detalleListaProveedors'
import { useForm } from 'react-hook-form'
import { crearProveedorApi, getListaProveedores } from '../../../../../api/proveedor'
import { ContextProveedor } from '../../../../../context/contextProveedores'



const ListaProveedoresDataProveedores = (props) => {
  const { state: { listaProveedores }, dispatch } = useContext(ContextProveedor)
  // console.log(typeof listaProveedores)
  console.log(listaProveedores)
  const { nuevoRegistro, setNuevoRegistro } = props
  const [modalShow, setModalShow] = useState(false)


  function actualizarLista() {
    getListaProveedores()
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PROVEEDORES", lista })
        }
      })
  }

  useEffect(() => {
    getListaProveedores()
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PROVEEDORES", lista })
        }
      })
  }, [])

  return (
    <div>
      {
        listaProveedores.length === 0 ?
          <>
            <Spinner animation="border" role="status">
            </Spinner>
          </>
          : <DetalleListaProveedoresDataProveedores />
      }
      <ModalError
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <CrearRegistro
        show={nuevoRegistro}
        onHide={() => setNuevoRegistro(false)}
        actualizarLista={actualizarLista}
      />
    </div>
  )
}
function ModalError(props) {
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
function CrearRegistro(props) {
  const { actualizarLista } = props
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
            actualizarLista()
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
export default ListaProveedoresDataProveedores
