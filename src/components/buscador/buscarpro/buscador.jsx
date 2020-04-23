import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ProductosContext } from '../../../context/productos'
import Espera from '../../espera'
import toast from 'toasted-notes'


import './buscador.scss'

const Buscador = () => {

    const { categorias, marcasauto, resultado, getProductos, modelosauto, años, vistopro, eliminaaños, eliminamodelos, filtraproductos, resultadofiltro, eliminafiltro } = useContext(ProductosContext)
    const [data, setData] = useState({
        categoria: null,
        marcaauto: null,
        modeloauto: null,
        añoauto: null
    })
    const [titulo, setTitulo] = useState()

    const cambiacategoria = () => {
        const valor = document.getElementById("categories").value
        setData({
            ...data,
            categoria: valor
        })
    }
    const cambiamarca = () => {
        const valor = document.getElementById("markas").value
        setData({
            ...data,
            marcaauto: valor
        })
    }
    const cambiamodelo = () => {
        const valor = document.getElementById("modelo").value
        setData({
            ...data,
            modeloauto: valor
        })
    }
    const cambiaaño = () => {
        const valor = document.getElementById("ano").value
        setData({
            ...data,
            añoauto: valor
        })
    }

    const clicboton = () => {
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        if (data.modeloauto && data.añoauto && data.categoria && data.marcaauto) {
            filtraproductos(data)
            setTitulo(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.modeloauto, data.añoauto, data.categoria, data.marcaauto])
    useEffect(() => {
        if (data.categoria && data.marcaauto) {
            setTitulo("Buscando productos...")
            toast.notify("Estamos buscando...", { duration: 3000, position: 'top' })
            getProductos(data.categoria, data.marcaauto)
        } else {
            setTitulo("Selecciona categoria y marca de vehículo")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.categoria, data.marcaauto])
    useEffect(() => {
        if (resultado) {
            document.getElementById("modelo").disabled = false
            document.getElementById("ano").disabled = false
            setTitulo("Selecciona modelo y año del vehículo")
        }
        if (resultado === false) {
            setTitulo("DISCULPA, NO TENEMOS EL REPUESTOS QUE BUSCAS")
        }

    }, [resultado])
    useEffect(() => {
        if (vistopro) {
            eliminaaños()
            eliminamodelos()
            eliminafiltro()
            setTitulo("Selecciona categoria y marca de vehículo")
            document.getElementById("modelo").disabled = true
            document.getElementById("ano").disabled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (categorias.length > 0 && marcasauto.length > 0) {
        return (
            <div className="buscador">
                <div className="buscador__titulo">
                    <h3>{titulo}</h3>
                </div>
                <div className="buscador__formulario">
                    <form className="form-inline">
                        <select className="custom-select form-control"
                            onChange={cambiacategoria}
                            id="categories"
                        >
                            <option defaultValue> Categoría</option>
                            {
                                categorias.map((categoria, i) =>
                                    categoria.parent > 0 ?
                                        (
                                            <option
                                                key={i}
                                                value={categoria.id}>
                                                {categoria.name}
                                            </option>
                                        ) : (null)
                                )
                            }
                        </select>
                        <select className="custom-select form-control"
                            onChange={cambiamarca}
                            id="markas"
                        >
                            <option defaultValue>Marca vehículo</option>
                            {
                                marcasauto.map((mark, i) =>
                                    <option
                                        key={i}
                                        value={mark.id}>
                                        {mark.name}
                                    </option>
                                )
                            }
                        </select>
                        <select className="custom-select form-control" disabled id="modelo" onChange={cambiamodelo}
                        >
                            {
                                modelosauto.length > 0 ? (<option defaultValue>Modelo vehículo</option>) : (<option defaultValue>NO disponible</option>)
                            }
                            {
                                modelosauto.map((model, i) =>
                                    <option
                                        key={i}
                                        value={model}>
                                        {model}
                                    </option>
                                )
                            }
                        </select>
                        <select className="custom-select form-control" disabled id="ano" onChange={cambiaaño}>
                            {
                                años.length > 0 ? (<option defaultValue>Año vehículo</option>) : (<option defaultValue>NO disponible</option>)
                            }
                            {
                                años.map((ano, i) =>
                                    <option
                                        key={i}
                                        value={ano}>
                                        {ano}
                                    </option>
                                )
                            }
                        </select>
                        {
                            resultadofiltro ?
                                (
                                    <Link
                                        to='/resultados'
                                        className="btn btn-primary mb-2 btn-buscar "
                                        onClick={clicboton}
                                    >
                                        Ver resultados

                                    </Link>
                                ) :
                                (
                                    resultadofiltro === false ?
                                        (
                                            <p>Lo siento, sin resultados en la busqueda</p>
                                        ) :
                                        (
                                            null
                                        )
                                )
                        }
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Espera />
    )

}

export default Buscador