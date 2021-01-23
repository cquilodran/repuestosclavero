import React, { useContext, useState, useEffect } from 'react'
import { Form, Modal, Button, Col } from 'react-bootstrap'
import { Search, XSquare } from 'react-bootstrap-icons'
import { buscaIngresoProveedorApi, getListaIngresoProveedorApi } from '../../../../api/ingresosProveedor'
import { useForm } from 'react-hook-form'
import { ContextIngresoProveedor } from '../../../../context/contextIngresoProveedor'
import { getListaProveedores } from '../../../../api/proveedor'
import { getListaDocumentosApi } from '../../../../api/documentos'

import './BusquedaIngresosProveedor.scss'


const BusquedaIngresoProveedor = props => {
  const { paginaActual, sucursalActiva } = props
  const { dispatch } = useContext(ContextIngresoProveedor)
  const { register, handleSubmit, reset } = useForm()
  const [modalShow, setModalShow] = useState(false)
  const [listaProveedores, setListaProveedores] = useState([])
  const [listaDocumentos, setListaDocumentos] = useState([])
  const [buscando, setBuscando] = useState(false)

  // peticion de data para buscadores
  useEffect(() => {
    getListaProveedores(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          alert("No fue posible recuperar la lista de proveedores")
        } else {
          setListaProveedores(lista.proveedores.docs)
        }
      })
  }, [])
  useEffect(() => {
    getListaDocumentosApi(1, 1000)
      .then(lista => {
        if (lista.ok === false) {
          alert("No fue posible recuperar la lista de documentos")
        } else {
          setListaDocumentos(lista.lista.docs)
        }
      })
  }, [])

  const onSubmit = values => {
    // console.log(values)
    // setBuscando(true)
    if (values.nDocumento === "") {
      values.nDocumento = null
    }
    if (values.proveedor === 'Proveedor') {
      values.proveedor = null
    }
    if (values.documento === 'Documento') {
      values.documento = null
    }
    // buscaIngresoProveedorApi(values, sucursalActiva, 1)
    buscaIngresoProveedorApi(values, sucursalActiva, paginaActual)
      .then(lista => {
        // console.log(lista);
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          if (lista.lista !== null) {
            // console.log("Lista  NO viene NULL");
            lista.nDocumento = values.nDocumento
            lista.proveedor = values.proveedor
            lista.documento = values.documento
            lista.sucursalactiva = values.sucursalactiva
            dispatch({ type: "BUSCANDO_INGRESO_PROVEEDOR", lista })
          }
        }
      })
  }
  const cancelar = () => {
    reset()
    getListaIngresoProveedorApi(paginaActual, 10, sucursalActiva)
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          dispatch({ type: "ACTUALIZA_LISTA_INGRESO_PROVEEDOR", lista })
        }
      })
  }
  return (
    <div>
      {
        buscando ?
          <div className="espera"></div>
          :
          <Form inline onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Control
                type='text'
                // size="sm"
                name="nDocumento"
                placeholder="N° documento"
                // defaultValue="Numero"
                ref={register()}
              />
              {
                listaProveedores.length > 0 ?
                  < Form.Control
                    as='select'
                    type="text"
                    name="proveedor"
                    // size="lg"
                    ref={register}
                  >
                    <option defaultValue>Proveedor</option>
                    {
                      listaProveedores.map((x, i) =>
                        x.activo ?
                          <option key={i} value={x._id}>
                            {x.nombre}
                          </option>
                          :
                          null
                      )
                    }
                  </ Form.Control>
                  :
                  <div className="espera"></div>
              }
              {
                listaDocumentos.length > 0 ?
                  <Form.Control
                    as='select'
                    type="text"
                    // placeholder="Perfil usuario"
                    name="documento"
                    // size="lg"
                    ref={register}
                  >
                    <option defaultValue>Documento</option>
                    {
                      listaDocumentos.map((x, i) =>
                        x.activo ?
                          <option key={i} value={x._id}>
                            {x.nombre}
                          </option>
                          :
                          null
                      )
                    }
                  </Form.Control >
                  :
                  <div className="espera"></div>
              }
              <Search
                className='ml-1'
                size="1.5em"
                type="onsubmit"
                onClick={handleSubmit(onSubmit)}
              />
              <XSquare
                className='ml-1'
                onClick={cancelar}
                size="1.5em"
              />
            </Form.Group>
          </Form>

      }
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
export default BusquedaIngresoProveedor