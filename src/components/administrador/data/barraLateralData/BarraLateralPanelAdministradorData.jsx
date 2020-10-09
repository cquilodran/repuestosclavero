import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './BarraLateralPanelAdministradorData.scss'

const menu = [
  { nombre: "Sucursales", link: "/panel-administrador/data/sucursales" },
  { nombre: "Usuarios", link: "/panel-administrador/data/usuarios" },
  { nombre: "Proveedores", link: "/panel-administrador/data/proveedores" },
  { nombre: "Documentos", link: "/panel-administrador/data/documentos" },
  { nombre: "Producto", link: "/panel-administrador/data/producto" },
  { nombre: "Categorias", link: "/panel-administrador/data/categorias" },
  { nombre: "Unidades", link: "/panel-administrador/data/unidades" },
  { nombre: "Lado vehículo", link: "/panel-administrador/data/lado-vehiculo" },
  { nombre: "Marca Producto", link: "/panel-administrador/data/marca-producto" },
  { nombre: "Marca vehículo", link: "/panel-administrador/data/marca-vehiculo" },
  { nombre: "Modelo vehículo", link: "/panel-administrador/data/modelo-vehiculo" },

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