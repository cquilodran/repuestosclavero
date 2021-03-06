import React from 'react'

import Tituloseccion from '../tituloseccion/index'

import './marcas.scss'
import gabriel from '../../assets/logo-gabriel.svg'
import corven from '../../assets/logo-corven.svg'
import kyv from '../../assets/logo-kyb.svg'
import beste from '../../assets/logo-beste.svg'


const Marcas = () => {


    return (
        <div className="marcas">
            <Tituloseccion txt="Nuestras marcas" />
            <div className="marcas__logos">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-6">
                            <img src={gabriel} alt="logo gabriel" />
                        </div>
                        <div className="col-md-3 col-6">
                            <img src={corven} alt="logo corven" />
                        </div>
                        <div className="col-md-3 col-6">
                            <img src={kyv} alt="logo kyv" />
                        </div>
                        <div className="col-md-3 col-6">
                            <img src={beste} alt="logo beste" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Marcas