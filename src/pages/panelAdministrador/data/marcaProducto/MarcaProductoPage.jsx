import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import MarcaProducto from '../../../../components/administrador/data/marcaProducto'
import { ProviderMarcaProducto } from '../../../../context/contextMarcaProducto'
const MarcaProductoPage = () => {
  return (
    <ProviderMarcaProducto>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={8} />
          </Col>
          <Col md={10}>
            <MarcaProducto />
          </Col>
        </Row>
      </Container>
    </ProviderMarcaProducto>
  )
}

export default MarcaProductoPage
