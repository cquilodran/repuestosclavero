import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorIgresos from '../../../../components/administrador/ingresos/barraLateral'
// import UnidadesData from '../../../../components/administrador/data/unidades'
import IngresoProveedorIngresos from '../../../../components/administrador/ingresos//proveedor'
import { ProviderIngresoProveedor } from '../../../../context/contextIngresoProveedor'
const IngresoProveedorPage = () => {
  return (
    <ProviderIngresoProveedor>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorIgresos activo={0} />
          </Col>
          <Col md={10}>
            <IngresoProveedorIngresos />
          </Col>
        </Row>
      </Container>
    </ProviderIngresoProveedor>
  )
}

export default IngresoProveedorPage
