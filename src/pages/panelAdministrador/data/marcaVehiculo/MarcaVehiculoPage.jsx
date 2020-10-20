import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import MarcaVehiculo from '../../../../components/administrador/data/marcaVehiculo'
import { ProviderMarcaVehiculo } from '../../../../context/contextMarcaVehiculo'
const MarcaVehiculoPage = () => {
  return (
    <ProviderMarcaVehiculo>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={9} />
          </Col>
          <Col md={10}>
            <MarcaVehiculo />
          </Col>
        </Row>
      </Container>
    </ProviderMarcaVehiculo>
  )
}

export default MarcaVehiculoPage
