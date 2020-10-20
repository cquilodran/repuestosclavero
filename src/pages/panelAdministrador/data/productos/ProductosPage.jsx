import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import ProductosData from '../../../../components/administrador/data/productos'
import { ProviderProductos } from '../../../../context/contextProductos'
const UnidadesPage = () => {
  return (
    <ProviderProductos>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={4} />
          </Col>
          <Col md={10}>
            <ProductosData />
          </Col>
        </Row>
      </Container>
    </ProviderProductos>
  )
}

export default UnidadesPage
