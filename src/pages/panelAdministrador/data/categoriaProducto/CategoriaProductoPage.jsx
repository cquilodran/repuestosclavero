import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import CategoriaProducto from '../../../../components/administrador/data/categoriaProducto'
import { ProviderCategoriaProducto } from '../../../../context/contextCategoriaProducto'
const CategoriaProductoPage = () => {
  return (
    <ProviderCategoriaProducto>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={5} />
          </Col>
          <Col md={10}>
            <CategoriaProducto />
          </Col>
        </Row>
      </Container>
    </ProviderCategoriaProducto>
  )
}

export default CategoriaProductoPage
