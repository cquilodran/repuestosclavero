/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const ProductosContext = React.createContext()
const { Provider, Consumer } = ProductosContext


function ProductosProvider({ children }) {
    // contexto de productos carga inicial
    //Fomulario pro
    const [categorias, setCategorias] = useState([])
    const [marcasauto, setMarcasauto] = useState([])
    //formulario basico




    // contexto de datos en base a seleccion de usuario
    //Fomulario pro
    const [años, setAños] = useState([])
    const [modelosauto, setModelosauto] = useState([])
    //formulario basico



    // resultado busqueda formulario pro
    //Fomulario pro
    const [productos, setProductos] = useState([])
    const [filtrados, setFiltrados] = useState([])
    //formulario basico


    // control de estados de peticiones
    //Fomulario pro
    const [vistopro, setVistopro] = useState(false)
    const [resultado, setResultado] = useState(null)
    const [resultadofiltro, setResultadofiltro] = useState(null)
    //formulario basico


    useEffect(() => {
        // peticion de categorias
        Axios({
            method: 'get',
            url: 'https://gestionbd.repuestosclavero.cl/wp-json/wc/v2/products/categories',
            auth: {
                username: "ck_6f821f4bd36d7e5608c75fb11c700ddf6d516371",
                password: "cs_3e2c5a8fee141a41a1026ecea379c623390fb538"
            },
            params: {
                per_page: 100,
            }
        })
            .then((response => {
                setCategorias(response.data)
            }))
        // Peticion de marcas de autos
        Axios({
            method: 'get',
            url: 'https://gestionbd.repuestosclavero.cl/wp-json/wc/v2/products/attributes/4/terms',
            auth: {
                username: "ck_6f821f4bd36d7e5608c75fb11c700ddf6d516371",
                password: "cs_3e2c5a8fee141a41a1026ecea379c623390fb538"
            },
            params: {
                per_page: 100
            }
        })
            .then((response => {
                setMarcasauto(response.data)
            }))
    }, [])
    function getProductos(categoria, marca) {
        setModelosauto([])
        setAños([])
        setResultado(null)
        setVistopro(true)
        Axios({
            method: 'get',
            url: 'https://gestionbd.repuestosclavero.cl/wp-json/wc/v2/products',
            auth: {
                username: "ck_6f821f4bd36d7e5608c75fb11c700ddf6d516371",
                password: "cs_3e2c5a8fee141a41a1026ecea379c623390fb538"
            },
            params: {
                per_page: 100,
                category: categoria,
                attribute: "pa_marca-vehiculo",
                attribute_term: marca,
            }
        })
            .then((response => {

                setProductos(response.data)

                if (response.data.length > 0) {

                    function mks(data) {
                        const y = [] // Modelo
                        const x = [] // año
                        data.map((pd, ind) =>
                            pd.attributes.map((at, i) =>
                                at.id === 6 ?
                                    (
                                        at.options.map((op, ix) =>
                                            y.push(op)
                                        )
                                    )
                                    : (at.id === 5 ?
                                        (
                                            at.options.map((op, ix) =>
                                                x.push(op)
                                            )
                                        )
                                        : (null))
                            )
                        )
                        Array.prototype.unique = function (a) {
                            return function () { return this.filter(a) }
                        }(function (a, b, c) {
                            return c.indexOf(a, b + 1) < 0
                        });
                        if (y.length > 0) {
                            setModelosauto(y.unique())
                        } else {
                            setModelosauto(y)
                        }
                        if (x.length > 0) {
                            setAños(x.unique().sort(function (a, b) { return a - b; }))
                        } else {
                            setAños(x.sort(function (a, b) { return a - b; }))
                        }
                        setResultado(true)
                    }
                    mks(response.data)
                } else {
                    setResultado(false)
                }
            }))
    }
    function eliminaaños() {
        setAños([])
    }
    function eliminamodelos() {
        setModelosauto([])
    }
    function filtraproductos(data) {

        const x = []
        const y = [data.añoauto]

        productos.map((p, i) =>
            p.attributes.map((pa, ia) =>
                pa.id === 6 ?
                    (
                        pa.options.includes(data.modeloauto) ? (x.push(p)) : (null)
                    ) :
                    (null)
            )
        )
        x.map((px, i) =>
            px.attributes.map((pax, ia) =>
                pax.id === 5 ?
                    (
                        pax.options.includes(data.añoauto) ? (y.push(px)) : (null)
                    ) :
                    (null)
            )
        )
        if (y.length > 1) {
            setResultadofiltro(true)

        } else { setResultadofiltro(false) }
        // y.push(data.añoauto)
        setFiltrados(y)
    }
    function eliminafiltro() {
        setResultadofiltro(null)
    }
    function eliminaresultado() {
        setResultado(null)
    }


    return (
        <Provider value={
            {
                productos,
                categorias,
                años,
                marcasauto,
                modelosauto,
                getProductos,
                resultado,
                vistopro,
                eliminaaños,
                eliminamodelos,
                eliminaresultado,
                filtraproductos,
                filtrados,
                resultadofiltro,
                eliminafiltro,

            }
        }>
            {children}
        </Provider>
    )
}
export {
    ProductosProvider,
    Consumer as useProductosConsumer,
    ProductosContext
}
