/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom'

import { ProductosContext } from '../../context/productos'


// Componentes
import Buscador from '../../components/buscador/buscarpro'
import Marcas from '../../components/marcas'

// Styles
import './home.scss';
import Fondo from '../../assets/3.jpg'

const Home = () => {
    const { propaginados } = useContext(ProductosContext)

    // window.onscroll =()=>{

    //     if (document.documentElement.scrollTop > 100) {
    //        console.log("Scroll activado"); 
    //     }
    // }




    const alto = '60vh'
    const estilos = { backgroundImage: `url(${Fondo})`, height: `${alto}` }
    return (
        <div className="home">
            <div className="home__portada" style={estilos}>
                <div className="capa">
                    <h2>Repuestos Clavero</h2>
                    <h1>Repuestos y accesorios para vehículos</h1>
                    <p>Despachos a todo Chile.</p>
                    {
                        propaginados.length > 0 ?
                            (<Link to="/tienda" className="btn-tienda">
                                Ver todos repuestos
                    </Link>) : (null)
                    }

                </div>
            </div>

            <div className="home__buscador">
                <Buscador />
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