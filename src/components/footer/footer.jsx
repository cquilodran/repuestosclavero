import React from 'react';

import './footer.scss';
import { FaDirections } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'
import transbank from '../../assets/transbank.jpeg'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container footer__principal">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Ubícanos</h5>
                        <p><FaDirections /> Concha Y Toro Con Genaro Salinas
                            Puente Alto
                        </p>
                        <p><FaPhoneAlt /> (2) 2850 4866</p>
                        <p><MdEmail /> contacto@repuestosclavero.cl</p>
                        <div className="rrss" >
                            <hr />
                            <a href="https://www.facebook.com/Repuestosclavero/" target="blank">
                                <FaFacebookF />
                            </a>
                            <a href="https://www.instagram.com/repuestosclavero/" target="blank">
                                <FaInstagramSquare />
                            </a>
                            <hr />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5>Garantía</h5>
                        <p>
                            Nuestros producto son certificados y
                            fabricados bajo altos estandares de seguridad.
                        </p>
                        <p>
                            Buscamos trabajar con las mejores marcas
                            del mercado, lo que nos permite asegurar
                            calidad en cada producto.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Métodos de pago</h5>
                        <img className="img-fluid" src={transbank} alt="logo transbanck" />
                    </div>
                </div>
            </div>
            <div className="footer__creditos">
                <p>
                    Derechos reservados Repuestos Clavero 2020 |
                    Creado por <a href="https://publimarketing.cl/"> Publimarketing Chile Spa</a>
                </p>
            </div>
        </div>
    )
}
export default Footer