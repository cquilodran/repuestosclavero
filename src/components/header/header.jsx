import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './header.scss';
import Logo from '../../assets/logo-blanco2.png';
import { BsHouse } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";


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
                        <BsHouse size='1.5em' color="white" className="icono" />
                        Home
                    </Link>
                    <Link to='/despachos' className="menu-item" onClick={activamenu}>
                        <FiTruck size='1.5em' color="white" className="icono" />
                        Despachos
                    </Link>
                </div>
                <div className="header__nav__rrss">
                    <a href="https://wa.me/56982044499?text=Me%20gustaría%20cotizar" target='blank'>
                        <FaWhatsapp className='wsp' />
                    </a>
                    <a href="tel:+56228504866">
                        <FaPhone className='fono' />
                    </a>
                    <a href="mailto:contacto@repuestosclavero.cl">
                        <AiOutlineMail className='email' />
                    </a>
                </div>
                <div className="header__nav__icono" id="icono" onClick={activamenu}>
                    <span>&#9776;</span>
                </div>
            </nav>


        </div>
    )
}
export default Header