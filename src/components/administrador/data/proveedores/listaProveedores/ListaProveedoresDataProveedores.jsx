import React, { useEffect, useState } from 'react'
import { getListaProveedores } from '../../../../../api/backend'
import { Modal, Button, Spinner } from 'react-bootstrap'
import DetalleListaProveedoresDataProveedores from '../detalleListaProveedors'

const ListaProveedoresDataProveedores = () => {
  const [modalShow, setModalShow] = useState(false)
  const [lista, setLista] = useState(null)


  function actualizarLista() {
    getListaProveedores()
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          setLista(lista)
        }
      })
  }

  useEffect(() => {
    getListaProveedores()
      .then(lista => {
        if (lista.ok === false) {
          setModalShow(true)
        } else {
          setLista(lista)
        }
      })
    return () => {
    }
  }, [])

  return (
    <div>
      {
        lista === null ?
          <>
            <Spinner animation="border" role="status">
            </Spinner>
          </>
          : <DetalleListaProveedoresDataProveedores data={lista} actualizarLista={actualizarLista} />
      }
      <ModalError
        show={modalShow}
        onHide={() => setModalShow(false)}
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

export default ListaProveedoresDataProveedores
