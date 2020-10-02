import React, { useState } from 'react'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons'

import FormularioBusquedaDataProveedores from './formularioBusqueda'
import ListaProveedoresDataProveedores from './listaProveedores'
import './ProveedoresData.scss'

const ProveedoresData = () => {
  const [nuevoRegistro, setNuevoRegistro] = useState(false)
  return (
    <div className="Proveedores_data">
      <h2>Lista de Proveedores</h2> <span></span>
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
          <ListaProveedoresDataProveedores nuevoRegistro={nuevoRegistro} setNuevoRegistro={setNuevoRegistro} />
        </Col>
      </Row>
    </div>
  )
}
// mejor hare un contexto general que gestione lo que se debe mostrar en los componentes, esta muy complicado gestionarlo individualmente
export default ProveedoresData
