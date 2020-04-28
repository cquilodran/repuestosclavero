import React from 'react';
import './Espera.scss';
import espe from '../../assets/logo-blanco.png'


function Espera() {
    return (

        <>
            <div className="espera">
                <img src={espe} alt="logo espera" className="img-fluid" />
            </div>
        </>
    )
}

export default Espera;