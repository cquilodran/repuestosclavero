import React from 'react';

import Tituloseccion from '../../components/tituloseccion';

import './tienda.scss';
import Buscadorbasic from '../../components/buscador/buscadorbasic/buscadorbasic';

const Tienda = () => {
    return (
        <div className="tienda">
            <Tituloseccion
                txt="Tienda"
            />
            <Buscadorbasic />
        </div>
    )
}
export default Tienda