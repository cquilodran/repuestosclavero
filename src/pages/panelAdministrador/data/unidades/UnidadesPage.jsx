import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import UnidadesData from '../../../../components/administrador/data/unidades'
import { ProviderUnidades } from '../../../../context/contextUnidades'
const UnidadesPage = () => {
  return (
    <ProviderUnidades>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={6} />
          </Col>
          <Col md={10}>
            <UnidadesData />
          </Col>
        </Row>
      </Container>
    </ProviderUnidades>
  )
}

export default UnidadesPage
