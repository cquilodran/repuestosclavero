import React, { useContext } from 'react'
import { ContextUserContext } from '../../../context/user/ContextUser'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap'


const HeaderPanelAdministrador = () => {
  const { usuario: { sucursal_nombre } } = useContext(ContextUserContext)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
      <Navbar.Brand href="#home">
        Repuestos Clavero Chile | {sucursal_nombre}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <LinkContainer to='/user/home'>
            <NavItem className="nav-link " eventkey={1}>
              Ingresos
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/user/ficha-personal'>
            <NavItem className='nav-link' eventkey={2}>
              Salidas
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/user/cv'>
            <NavItem className='nav-link' eventkey={3}>
              Stock
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/panel-administrador/data'>
            <NavItem className='nav-link' eventkey={4}>
              Data
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/user/trabajos'>
            <NavItem className='nav-link' eventkey={5}>
              Ecommerce
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/panel-administrador/home'>
            <NavItem className='nav-link' eventkey={6}>
              Panel general
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">
            Salir
          </Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HeaderPanelAdministrador