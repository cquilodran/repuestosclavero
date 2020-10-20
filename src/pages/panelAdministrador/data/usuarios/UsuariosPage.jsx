import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import { ProviderUsuarios } from '../../../../context/contextUsuarios'
import UsuariosData from '../../../../components/administrador/data/usuarios'

const UsuariosPage = () => {
  return (
    <ProviderUsuarios>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={1} />
          </Col>
          <Col md={10}>
            <UsuariosData />
          </Col>
        </Row>
      </Container>
    </ProviderUsuarios>
  )
}

export default UsuariosPage
