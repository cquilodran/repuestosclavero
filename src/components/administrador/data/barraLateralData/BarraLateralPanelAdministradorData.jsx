import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './BarraLateralPanelAdministradorData.scss'

const BarraLateralPanelAdministradorData = ({ data, activo }) => {
  return (
    <div className='BarraLateralPanelAdministradorData'>

      <Nav className='flex-column' >
        {
          data.map((x, i) =>
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