import React from 'react'
import TarjetaProducto from '../tarjetaproducto'


import './resulbusqueda.scss'

const Resulbusqueda = (props) => {
  const { data } = props
  // console.log(data);


  return (
    <>
      <div className="resulbusqueda">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h3>Resultados de tu busqueda: {data.length}</h3>
            </div>
          </div>
          <div className="row">
            {data.map((x, i) =>
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
        </div>
      </div>
    </>
  )
}

export default Resulbusqueda