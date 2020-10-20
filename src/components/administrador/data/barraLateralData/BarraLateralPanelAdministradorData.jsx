import React, { useContext } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ContextUserContext } from '../../../../context/user/ContextUser'

import './BarraLateralPanelAdministradorData.scss'

const menu = [
  { nombre: "Sucursales", link: "/panel-administrador/data/sucursales" },
  { nombre: "Usuarios", link: "/panel-administrador/data/usuarios" },
  { nombre: "Proveedores", link: "/panel-administrador/data/proveedores" },
  { nombre: "Documentos", link: "/panel-administrador/data/documentos" },
  { nombre: "Productos", link: "/panel-administrador/data/productos" },
  { nombre: "Categorias", link: "/panel-administrador/data/categorias" },
  { nombre: "Unidades", link: "/panel-administrador/data/unidades" },
  { nombre: "Lado vehículo", link: "/panel-administrador/data/lado-vehiculo" },
  { nombre: "Marca Producto", link: "/panel-administrador/data/marca-producto" },
  { nombre: "Marca vehículo", link: "/panel-administrador/data/marca-vehiculo" },
  { nombre: "Modelo vehículo", link: "/panel-administrador/data/modelo-vehiculo" },

]
const BarraLateralPanelAdministradorData = ({ activo }) => {
  const { usuario: { user_nombre } } = useContext(ContextUserContext)

  return (
    <div className='BarraLateralPanelAdministradorData'>

      <Nav className='flex-column' >
        <h5 className="font-italic font-weight-bold">{user_nombre}</h5>
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