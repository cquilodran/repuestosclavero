import React from 'react'

import './buscador.scss'

const Buscador = () => {
    return (
        <div className="buscador">
            {/* <div className="buscador__titulo">
                <h2>Buscador</h2>
            </div> */}
            <div className="buscador__formulario">
                <form className="form-inline">
                {/* <form className=""> */}
                    <select className="custom-select form-control">
                        <option defaultValue> Categoría</option>
                        <option value="1">Suspención</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="custom-select form-control">
                        <option defaultValue>Marca auto</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="custom-select form-control">
                        <option defaultValue>Modelo auto</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select className="custom-select form-control">
                        <option defaultValue>Año auto</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>


                    <button 
                        type="submit" 
                        className="btn btn-primary mb-2 btn-buscar "
                    >
                        Buscar...
                    </button>
                </form>
            </div>

        </div>

    )
}
export default Buscador