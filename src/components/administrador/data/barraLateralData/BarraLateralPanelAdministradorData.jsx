import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './BarraLateralPanelAdministradorData.scss'

const menu = [
  { nombre: "Proveedores", link: "/panel-administrador/data/proveedores" },
  { nombre: "Sucursales", link: "/panel-administrador/data/sucursales" },
  { nombre: "Unidades", link: "/panel-administrador/data/proveedores" },
  { nombre: "Documentos", link: "/panel-administrador/data/proveedores" },
  { nombre: "Usuarios", link: "/panel-administrador/data/proveedores" }
]
const BarraLateralPanelAdministradorData = ({ activo }) => {
  return (
    <div className='BarraLateralPanelAdministradorData'>

      <Nav className='flex-column' >
        {
          menu.map((x, i) =>
            <div key={i}>
              <LinkContainer to={x.link} className='link'>
                <NavItem className={i === activo ? "activo" : null}>
                  {x.nombre}
                </NavItem>
              </LinkContainer>
            </div>
          )
        }
      </Nav>
    </div>
  )
}

export default BarraLateralPanelAdministradorData