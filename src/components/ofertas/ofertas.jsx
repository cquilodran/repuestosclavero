import React from 'react';

import TarjetaProducto from '../tarjetaproducto'

import './ofertas.scss'

const Ofertas = () => {
    return (
        <div className="ofertas">
            <div className="ofertas__titulo">
                <h2>Ofertas destacadas</h2>
            </div>
            <div className="ofertas__tarjetas">
                <div className="container-fluid">
                    <div className="row">
                        <div className=" col-xl-3 col-md-6 col-12">
                            <TarjetaProducto/>
                        </div>
                        <div className=" col-xl-3 col-md-6 col-12">
                            <TarjetaProducto/>
                        </div>
                        <div className=" col-xl-3 col-md-6 col-12">
                            <TarjetaProducto/>
                        </div>
                        <div className=" col-xl-3 col-md-6 col-12">
                            <TarjetaProducto/>
                        </div>
                    </div>
                </div>
                
                
                
                
            </div>
        </div>
    )
}

export default Ofertas