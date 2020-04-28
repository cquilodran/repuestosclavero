import React, { useContext, useState, useEffect } from 'react'
import { ProductosContext } from '../../context/productos'
import Tituloseccion from '../../components/tituloseccion';
import { useInView } from 'react-intersection-observer';


import './despachos.scss';
import pullman from '../../assets/pullman-cargo-min.jfif'
import chilexpress from '../../assets/chilexpress-min.jfif'
import starken from '../../assets/starken-min.jfif'

const Despachos = () => {
    const { pedirproductospaginados, cargandopaginados } = useContext(ProductosContext)
    const [contador, setContador] = useState(1)

    useEffect(() => {
        if (cargandopaginados !== false) {
            pedirproductospaginados(100, contador)
            setContador(contador + 1)
        }
    }, [cargandopaginados])
    const [visto, inView] = useInView({ threshold: 0 })

    if (inView) {
        document.getElementById("texto-despacho").classList.remove("invisible")
        document.getElementById("texto-despacho").classList.add("aparecer")
    }
    return (
        <div className="despachos" ref={visto} id="texto-despacho">
            <Tituloseccion txt="Despachos" />
            <div className="despachos__texto" >
                <p>
                    ¡Despachamos a todo chile de Arica a Punta Arenas e Islas peninsulares
                    por pagar vía Starken, Pullman cargo y Chilexpress o con la empresa que
                    te acomode en 24hrs o día hábil siguiente!
                </p>
                <strong>
                    Debido a las demoras en los transportes, te aseguramos el envío de tus
                    producto, pero debes tener paciencia tanto en el despacho como en la llegada.
                </strong>
            </div>
            <div className="despachos__iconos-transporte">
                <img className="img-fluid" src={pullman} alt="logo pullman" />
                <img className="img-fluid" src={chilexpress} alt="logo chilexpress" />
                <img className="img-fluid" src={starken} alt="logo starken" />
            </div>
        </div>
    )
}
export default Despachos