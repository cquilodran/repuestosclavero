import React from 'react'

import Resultados from '../../resultados'

import './buscadorbasic.scss'

const Buscadorbasic = () => {
    return (
        <>
            <div className="buscadorbasic">
                <form action="" className="buscadorbasic__form">
                    <input
                        className="input"
                        type="text"
                        placeholder="Busca tu respuesto..."
                    />
                    <br />
                    <button
                        className="btn-buscar-2"
                    >
                        Buscar
                </button>
                </form>
            </div>
            <Resultados />
        </>
    )
}

export default Buscadorbasic