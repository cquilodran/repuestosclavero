import React from 'react'

import TarjetaProducto from '../tarjetaproducto'

import './resultados.scss'

const Resultados = () => {
    return (
        <div className="resultados">
            <div className="resultados__busqueda">
                <h4>
                    Resultados para... XXXXX SSSSSSSSSSSSSSSS FFFFFF GGGG KKKKK TTTTTTTT
                </h4>
            </div>
            <div className="resultados__productos">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <button>
                                <strong>Ordenar por precio: </strong>
                                de mayor a menor
                            </button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        {/* Aca va un bucle  */}
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                        <div className="col-lg-3">
                            <TarjetaProducto />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Resultados
