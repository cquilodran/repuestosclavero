import React from 'react';

import Espera from '../../components/espera'
import './notfound.scss';

const Notfound = () => {
    return (
        <div className="notfound">
            <p>pagina no encontrada</p>
            <Espera />
        </div>
    )
}
export default Notfound