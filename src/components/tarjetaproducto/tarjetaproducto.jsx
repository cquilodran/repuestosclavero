import React from 'react'

import './tarjetaproducto.scss'
import Logo from '../../assets/001.png';


const TarjetaProducto = () => {
    return (
        <div className="tarjetaproducto">
            <div className="tarjetaproducto__img">
                <img src={Logo} alt="" className="img-fluid" />
            </div>

            <h2>Amortiguador delantero R/L Chevrolet Cruze</h2>
            <p><strong>Precio: </strong> $19.990 CLP</p>
            <p><strong>Marca: </strong> Gabriel</p>
            <p><strong>Marca Vehículo: </strong> Chevrolet</p>
            <p><strong>Modelo Vehículo: </strong> Cruze</p>
            <p><strong>Años Vehículo: </strong> 2001...2011</p>
            <button>Cotizar WSP</button>
        </div>
    )
}

export default TarjetaProducto