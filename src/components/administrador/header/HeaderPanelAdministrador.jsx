import React, { useContext } from 'react'
import { ContextUserContext } from '../../../context/user/ContextUser'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { } from 'react-bootstrap-icons'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../../../api/auth'


const HeaderPanelAdministrador = () => {
  const { usuario: { sucursal_nombre, perfil_nombre } } = useContext(ContextUserContext)
  const salir = () => {
    logout()
    window.location.href = "/sesion"
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-warning text-dark">
      <Navbar.Brand href="#home">
        Sucursal <strong>{sucursal_nombre}</strong> {perfil_nombre}
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
          <LinkContainer to='/panel-administrador/data/sucursales'>
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
          {/* <LinkContainer to='/'> */}
          <NavItem className='nav-link' eventkey={7} onClick={salir}>
            Salir
            </NavItem>
          {/* </LinkContainer> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default React.memo(HeaderPanelAdministrador)