import React, { useState, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import DetalleListaProveedoresDataProveedores from '../detalleListaProveedors'
import { ContextProveedor } from '../../../../../context/contextProveedores'



const ListaProveedoresDataProveedores = (props) => {
  const { state: { limit, page, pages, total }, dispatch } = useContext(ContextProveedor)
  const [modalShow, setModalShow] = useState(false)

  return (
    <div>
      <DetalleListaProveedoresDataProveedores />
      {/* Aca ira el modulo de paginacion */}
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
