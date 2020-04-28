import React, { useContext } from 'react'

import { ProductosContext } from '../../../context/productos'


import Resultados from '../../resultados'
import ResulBusqueda from '../../resulbusqueda'
import './buscadorbasic.scss'


const Buscadorbasic = () => {
    const { busqueda, resultadosbusquedausuario } = useContext(ProductosContext)

    const changeForm = (e) => {
        e.preventDefault()
        if (e.target.value === "") {
            resultadosbusquedausuario(null)
        } else {
            resultadosbusquedausuario(e.target.value)
        }
    }

    return (
        <>
            <div className="buscadorbasic">
                <div className="buscadorbasic__form">
                    <input
                        className="input"
                        type="text"
                        placeholder="Buscador de repuestos..."
                        name="name"
                        onChange={changeForm}
                    />
                    <br />
                </div>
            </div>

            <ResulBusqueda data={busqueda} />

            <Resultados />
        </>
    )
}

export default Buscadorbasic