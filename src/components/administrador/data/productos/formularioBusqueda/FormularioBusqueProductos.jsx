import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Spinner } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaProductoApi, getListaProductoApi } from '../../../../../api/productos'
import { getListaCategoriaActivoApi } from '../../../../../api/categoriaProducto'
import { useForm } from 'react-hook-form'
import { ContextProductos } from '../../../../../context/contextProductos'

import './FormularioBusqueProductos.scss'

const FormularioBusqueProductos = (props) => {
  const { paginaActual } = props
  const { dispatch } = useContext(ContextProductos)
  const { register, handleSubmit, reset } = useForm()
  const [modalShow, setModalShow] = useState(false)
  const [categoriasLista, setcategoriasLista] = useState([])


  const onSubmit = values => {
    if (values.nombre === "") {
      values.nombre = null
    }
    if (values.codigoBarra === '') {
      values.codigoBarra = null
    }
    if (values.categoria === 'null') {
      values.categoria = null
    }
    if (values.codigoProveedor === 'null') {
      values.categoria = null
    }
    buscaProductoApi(values, paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          if (lista.message === "Lista de registros") {
            dispatch({ type: "ACTUALIZA_LISTA_PRODUCTOS", lista })
          } else {
            dispatch({ type: "BUSCANDO_PRODUCTOS", lista })
          }
        }
      })
  }
  const cancelar = () => {
    reset()
    getListaProductoApi(paginaActual)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_PRODUCTOS", lista })
        }
      })
  }
  useEffect(() => {
    getListaCategoriaActivoApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          // setMessagePut(lista.message)
          alert("Error al recuperar lista de categorias")
        } else {
          setcategoriasLista(lista.lista.docs)
        }
      })
  }, [])
  return (
    <div className='FormularioBusqueProductos'>
      <Form inline onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Por nombre"
            size="sm"
            className="mr-1"
            name="nombre"
            ref={register()}
          />
          <Form.Control
            type="text"
            placeholder="Por código"
            size="sm"
            name="codigoBarra"
            className="mr-1"
            ref={register()}
          />
          <Form.Control
            type="text"
            placeholder="Código proveedor"
            size="sm"
            name="codigoProveedor"
            className="mr-1"
            ref={register()}
          />
          {
            categoriasLista.length > 0 ?
              <Form.Control
                as='select'
                type='text'
                name='categoria'
                size='sm'
                ref={register()}
              >
                <option defaultValue value="null">
                  Filtra por categoria
                </option>
                {
                  categoriasLista.map((x, i) =>
                    <option
                      key={i}
                      value={x._id}
                    >
                      {x.nombre}
                    </option>
                  )
                }
              </Form.Control>
              :
              <Spinner animation="border" role="status"></Spinner>
          }
          <Search
            className="cursor-pointer"
            size="1.5em"
            type="onsubmit"
            onClick={handleSubmit(onSubmit)}
          />
          <XSquare
            className="cursor-pointer"
            onClick={cancelar}
            size="1.5em"
          />
        </Form.Group>
      </Form>
      <ModalMensaje
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div >
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
          Error en la busqueda
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default FormularioBusqueProductos