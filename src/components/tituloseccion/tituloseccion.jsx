import React from 'react'

import './tituloseccion.scss'

const Tituloseccion = (props) => {
    const { txt } = props
    return (
        <div className="tituloseccion">
            <h2>{txt}</h2>
        </div>
    )
}

export default Tituloseccion