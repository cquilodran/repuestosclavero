import React from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons'

import FormularioBusquedaDataProveedores from './formularioBusqueda'
import ListaProveedoresDataProveedores from './listaProveedores'
import './ProveedoresData.scss'

const ProveedoresData = () => {
  return (
    <div className="Proveedores_data">
      <h2>Lista de Proveedores</h2>
      <Row>
        <Col md={10}>
          <FormularioBusquedaDataProveedores />
        </Col>
        <Col md={2}>
          <OverlayTrigger
            overlay={
              <Tooltip>Nuevo registro</Tooltip>
            }
          >
            <PlusCircle className="text-primary" size="1.5em" />
          </OverlayTrigger>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <ListaProveedoresDataProveedores />
        </Col>
      </Row>
    </div>
  )
}

export default ProveedoresData
