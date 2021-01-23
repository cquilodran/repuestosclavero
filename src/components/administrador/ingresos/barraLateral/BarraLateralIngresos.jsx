import React, { useContext } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ContextUserContext } from '../../../../context/user/ContextUser'

const menu = [
  { nombre: "Proveedor", link: "/panel-administrador/ingresos/proveedor" },
  // { nombre: "Usuarios", link: "/panel-administrador/ingresos/usuarios" },
  // { nombre: "Proveedores", link: "/panel-administrador/ingresos/proveedores" },
  // { nombre: "Documentos", link: "/panel-administrador/ingresos/documentos" },
  // { nombre: "Productos", link: "/panel-administrador/ingresos/productos" },
  // { nombre: "Categorias", link: "/panel-administrador/ingresos/categorias" },
  // { nombre: "Unidades", link: "/panel-administrador/ingresos/unidades" },
  // { nombre: "Lado vehículo", link: "/panel-administrador/ingresos/lado-vehiculo" },
  // { nombre: "Marca Producto", link: "/panel-administrador/ingresos/marca-producto" },
  // { nombre: "Marca vehículo", link: "/panel-administrador/ingresos/marca-vehiculo" },
  // { nombre: "Modelo vehículo", link: "/panel-administrador/ingresos/modelo-vehiculo" },

]
const BarraLateralIngresos = ({ activo }) => {
  const { usuario: { user_nombre } } = useContext(ContextUserContext)

  return (
    <div className='BarraLateralPanelAdministrador'>

      <Nav className='flex-column' >
        <h5 className="font-italic font-weight-bold">{user_nombre}</h5>
        <hr />
        <p>Ingresos por...</p>
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

export default React.memo(BarraLateralIngresos)