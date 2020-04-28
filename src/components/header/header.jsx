import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'

import './header.scss';
import Logo from '../../assets/logo-blanco2.png';
import { BsHouse } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { FiTruck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

import { ProductosContext } from '../../context/productos'

const Header = () => {
    const { propaginados } = useContext(ProductosContext)
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
                        <BsHouse size='1.5em' color="white" className="icono" />
                        Home
                    </Link>
                    {
                        propaginados.length > 0 ?
                            (
                                <Link to='/tienda' className="menu-item" onClick={activamenu}>
                                    <AiOutlineShop size='1.5em' color="white" className="icono" />
                                    Tienda
                    </Link>
                            ) :
                            (null)
                    }

                    <Link to='/despachos' className="menu-item" onClick={activamenu}>
                        <FiTruck size='1.5em' color="white" className="icono" />
                        Despachos
                    </Link>
                </div>
                <div className="header__nav__rrss">
                    <FaWhatsapp />
                    <FaPhone />
                    {/* <img className="img-fluid" src={wsp} alt="icono wsp" />
                    <img className="img-fluid" src={llamar} alt="icono llamar" /> */}
                </div>
                <div className="header__nav__icono" id="icono" onClick={activamenu}>
                    <span>&#9776;</span>
                </div>
            </nav>


        </div>
    )
}
export default Header