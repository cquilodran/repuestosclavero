/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';



// Componentes
import Buscador from '../../components/buscador/buscarpro'
import Marcas from '../../components/marcas'

// Styles
import './home.scss';
import { FiTruck } from "react-icons/fi";
import { IoMdCard } from "react-icons/io";
import { RiShieldStarLine } from "react-icons/ri";
const Home = () => {
    return (
        <div className="home">
            <div className="home__portada">
                <div className="capa">
                    <h2>Repuestos Clavero</h2>
                    <h1>Repuestos y accesorios para vehículos</h1>
                    <p>Despachos a todo Chile.</p>
                </div>
            </div>

            <div className="home__buscador">
                <Buscador />
            </div>
            <div className="home__miles">

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="tarjeta">
                                <h3>Reparto a domicilio</h3>
                                <p>Nos comprometemos a llevar tu respuestos en el menor tiempo posible.</p>
                                <FiTruck size='6em' color="black" className="icono" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="tarjeta">
                                <h3>Todo medio de pago</h3>
                                <p>Paga comodamente con tus tarjetas de crédito y/o débito.</p>
                                <IoMdCard size='6em' color="black" className="icono" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="tarjeta">
                                <h3>Compra garantizada</h3>
                                <p>Si por alguna razon el repuesto es el equivocado, puedes pedir devolución o cambio.</p>
                                <RiShieldStarLine size='6em' color="black" className="icono" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home__marcas">
                <Marcas />
            </div>
            <div className="home__mapa">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.6285941800047!2d-70.57692278479644!3d-33.614939880727285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d7ad30f344d9%3A0x8d2b680ff322d749!2sAv.%20Concha%20Y%20Toro%20%26%20Genaro%20Salinas%2C%20Puente%20Alto%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1587235673618!5m2!1ses!2scl" aria-hidden="false" ></iframe>
            </div>
        </div>
    )
}
export default Home