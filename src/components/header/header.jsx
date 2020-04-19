import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './header.scss';
import Logo from '../../assets/logo-blanco2.png';
import wsp from '../../assets//wsp2.png'
import llamar from '../../assets/llamar.png'

const Header = () => {

    const [act, setAct] = useState(false)
    const [menu, setMenu] = useState()


    useEffect(() => {
        setMenu(document.getElementById("menu"))
    }, [])

    const activamenu = () => {
        if (act === false) {
            menu.classList.remove("noactivo")
            menu.classList.add("activo")
            setAct(true)

        } else {
            menu.classList.remove("activo")
            menu.classList.add("noactivo")
            setAct(false)
        }
        scrollTop()
    }
    const scrollTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div className="header">
            <nav className="header__nav">
                <div className="header__nav__logo">
                    <Link to='/' onClick={scrollTop}>
                        <img className="img-fluid" src={Logo} alt="Logo Repuestos clavero" />
                    </Link>
                </div>
                <div className="header__nav__menu noactivo" id="menu">
                    <Link to='/' className="menu-item" onClick={activamenu}>
                        Home
                    </Link>
                    <Link to='/tienda' className="menu-item" onClick={activamenu}>
                        Tienda
                    </Link><Link to='/despachos' className="menu-item" onClick={activamenu}>
                        Despachos
                    </Link>
                </div>
                <div className="header__nav__rrss">
                    <img className="img-fluid" src={wsp} alt="icono wsp"/>
                    <img className="img-fluid" src={llamar} alt="icono llamar"/>
                </div>
                <div className="header__nav__icono" id="icono" onClick={activamenu}>
                    <span>&#9776;</span>
                </div>
            </nav>


        </div>
    )
}
export default Header