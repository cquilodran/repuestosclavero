import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import MaodeloVehiculo from '../../../../components/administrador/data/modeloVehiculo'
import { ProviderModeloVehiculo } from '../../../../context/contextModeloVehiculo'
const MarcaVehiculoPage = () => {
  return (
    <ProviderModeloVehiculo>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={10} />
          </Col>
          <Col md={10}>
            <MaodeloVehiculo />
          </Col>
        </Row>
      </Container>
    </ProviderModeloVehiculo>
  )
}

export default MarcaVehiculoPage
