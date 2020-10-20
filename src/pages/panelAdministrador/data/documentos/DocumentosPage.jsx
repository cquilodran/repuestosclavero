import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import BarraLateralPanelAdministradorData from '../../../../components/administrador/data/barraLateralData'
import DocumentosData from '../../../../components/administrador/data/documentos'
import { ProviderDocumentos } from '../../../../context/contextDocumentos'
const SucursalesPage = () => {
  return (
    <ProviderDocumentos>
      <Container fluid>
        <Row className='pt-5 pb-5'>
          <Col md={2}>
            <BarraLateralPanelAdministradorData activo={3} />
          </Col>
          <Col md={10}>
            <DocumentosData />
          </Col>
        </Row>
      </Container>
    </ProviderDocumentos>
  )
}

export default SucursalesPage
