import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import ProveedoresData from '../../../../components/administrador/data/proveedores'
import { ProviderProveedor } from '../../../../context/contextProveedores'

const ProveedoresDataPanelAdministrador = () => {

  return (
    <ProviderProveedor>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={2} />
          </Col>
          <Col md={10}>
            <ProveedoresData />
          </Col>
        </Row>
      </Container>
    </ProviderProveedor>
  )
}

export default ProveedoresDataPanelAdministrador