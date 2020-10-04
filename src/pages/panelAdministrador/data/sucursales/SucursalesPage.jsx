import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import SucursalesData from '../../../../components/administrador/data/sucursales'
import { ProviderSucursales } from '../../../../context/contextSucursales'
const SucursalesPage = () => {
  return (
    <ProviderSucursales>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={1} />
          </Col>
          <Col md={10}>
            <SucursalesData />
          </Col>
        </Row>
      </Container>
    </ProviderSucursales>
  )
}

export default SucursalesPage
