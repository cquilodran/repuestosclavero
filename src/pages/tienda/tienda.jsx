import React from 'react';
import { useInView } from 'react-intersection-observer';

import Tituloseccion from '../../components/tituloseccion';

import './tienda.scss';
import Buscadorbasic from '../../components/buscador/buscadorbasic/buscadorbasic';

const Tienda = () => {
    const [visto, inView] = useInView({ threshold: 0 })

    if (inView) {
        document.getElementById("basic").classList.remove("invisible")
        document.getElementById("basic").classList.add("aparecer")
    }

    return (
        <div className="tienda ">
            <Tituloseccion
                txt="Tienda"
            />
            <div className="invisible" ref={visto} id="basic">
                <Buscadorbasic />
            </div>

        </div>
    )
}
export default Tienda