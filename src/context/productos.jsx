/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const ProductosContext = React.createContext()
const { Provider, Consumer } = ProductosContext

var xxx = []

function ProductosProvider({ children }) {
    // contexto de productos carga inicial
    //Fomulario pro
    const [categorias, setCategorias] = useState([])
    const [marcasauto, setMarcasauto] = useState([])
    //formulario basico

    //Contexto cuando el cliente entra a pagina tienda
    const [propaginados, setPropaginados] = useState([])
    const [destacados, setDestacados] = useState([])


    // contexto de datos en base a seleccion de usuario
    //Fomulario pro
    const [años, setAños] = useState([])
    const [modelosauto, setModelosauto] = useState([])
    //formulario basico
    const [busqueda, setBusqueda] = useState([])



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
    const [cargandopaginados, setCargandopaginados] = useState(0)


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
            url: 'https://repuestosclavero.cl/backend/wp-json/wc/v2/products',
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
    function pedirproductospaginados(limite, pagina) {


        Axios({
            method: 'get',
            url: 'https://gestionbd.repuestosclavero.cl/wp-json/wc/v2/products',
            auth: {
                username: "ck_6f821f4bd36d7e5608c75fb11c700ddf6d516371",
                password: "cs_3e2c5a8fee141a41a1026ecea379c623390fb538"
            },
            params: {
                per_page: limite,
                page: pagina
            }
        })
            .then((response => {
                if (response.data.length > 0) {

                    response.data.map((x, i) =>
                        xxx.push(x)
                    )
                    setCargandopaginados(cargandopaginados + 1)
                } else {
                    setCargandopaginados(false)
                    setPropaginados(xxx)

                    async function desta(data) {
                        const des = []
                        await data.map((d, dd) =>
                            d.featured ?
                                (
                                    des.push(d)
                                )
                                :
                                (null)
                        )
                        setDestacados(des)
                        // console.log(des);

                    }
                    desta(xxx)
                }
            }))
            .catch(err => {
                return err
            })
    }
    function resultadosbusquedausuario(data) {
        if (data === null) {
            setBusqueda([])
        } else {

            const lista = propaginados.filter(item => {
                return (item.name.toLowerCase().includes(data.toLowerCase()))
            })

            const dataNueva = data.split(" ")
            // console.log(dataNueva);

            const listax = []
            propaginados.map((item, k) => {
                return (
                    item.attributes.map(it => {
                        return (
                            it.options.map(z => {


                                dataNueva.map(d => {
                                    if (z.toLowerCase().includes(d.toLowerCase())) {
                                        return listax.push(propaginados[k])
                                    }
                                })


                            })
                        )
                    })
                )
            })
            Array.prototype.unique = function (a) {
                return function () { return this.filter(a) }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            console.log(listax.unique());

            //FUNCIONA
            // const listax = []
            // propaginados.map((item, k) => {
            //     return (
            //         item.attributes.map(it => {
            //             return (
            //                 it.options.map(z => {
            //                     if (z.toLowerCase().includes(data.toLowerCase())) {
            //                         return listax.push(propaginados[k])
            //                     }
            //                 })
            //             )
            //         })
            //     )
            // })
            // console.log(listax);




            setBusqueda(lista)
        }
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
                pedirproductospaginados,
                propaginados,
                cargandopaginados,
                destacados,
                busqueda,
                resultadosbusquedausuario
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
