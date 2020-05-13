import React, { useContext, useState, useEffect } from 'react'
import { ProductosContext } from '../../context/productos'

import TarjetaProducto from '../tarjetaproducto'
import Espera from '../espera'

import './resultados.scss'

const Resultados = () => {

    const { propaginados, destacados } = useContext(ProductosContext)


    return (
        <div className="resultados">
            <div className="resultados__productos">
                <div className="container-fluid">
                    {
                        destacados.length > 0 ?
                            (
                                <div className="row">
                                    <div className="col-12">
                                        <h2>Productos destacados</h2>
                                    </div>
                                    {destacados.map((x, i) =>
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                                            <TarjetaProducto
                                                nombre={x.name}
                                                precio={x.price}
                                                marca={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 2 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                marca2={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 4 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                modelo={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 6 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                años={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 5 ?
                                                            (
                                                                `${y.options[0]}...${y.options[y.options.length - 1]}`
                                                            )
                                                            :
                                                            (null)
                                                    )
                                                }
                                                foto={x.images[0].src}
                                            />
                                        </div>
                                    )}

                                </div>
                            )
                            :
                            (
                                null
                            )
                    }
                    {

                        propaginados.length > 0 ?
                            (
                                <div className="row">
                                    <div className="col-12">
                                        <h2>Todos los productos</h2>
                                    </div>
                                    {propaginados.map((x, i) =>
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={i}>
                                            <TarjetaProducto
                                                nombre={x.name}
                                                precio={x.price}
                                                marca={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 2 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                marca2={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 4 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                modelo={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 6 ?
                                                            (y.options) :
                                                            (null)
                                                    )
                                                }
                                                años={
                                                    x.attributes.map((y, ii) =>
                                                        y.id === 5 ?
                                                            (
                                                                `${y.options[0]}...${y.options[y.options.length - 1]}`
                                                            )
                                                            :
                                                            (null)
                                                    )
                                                }
                                                foto={x.images[0].src}
                                            />
                                        </div>
                                    )}

                                </div>
                            )
                            :
                            (
                                <>
                                    <h3>Cargando todos nuestros repuestos...</h3>
                                    <Espera />
                                </>

                            )
                    }

                    <br />
                </div>
            </div>



        </div>
    )
}

export default Resultados
