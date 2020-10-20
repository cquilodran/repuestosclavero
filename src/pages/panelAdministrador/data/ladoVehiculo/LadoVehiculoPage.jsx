import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import LadoVehiculo from '../../../../components/administrador/data/ladoVehiculo'
import { ProviderLadoVehiculo } from '../../../../context/contextLadoVehiculo'
const LadoVehiculoPage = () => {
  return (
    <ProviderLadoVehiculo>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={7} />
          </Col>
          <Col md={10}>
            <LadoVehiculo />
          </Col>
        </Row>
      </Container>
    </ProviderLadoVehiculo>
  )
}

export default LadoVehiculoPage
