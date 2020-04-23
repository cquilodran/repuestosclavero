import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { ProductosContext } from '../../context/productos'
import { BsHouse } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";

import './resultados.scss'
import TarjetaProducto from '../../components/tarjetaproducto'

const Resultados = () => {
  const { filtrados, resultadofiltro } = useContext(ProductosContext)



  if (resultadofiltro === null) {
    return (
      <>
        <div className="resultados">
          <h3>Lo siento, no usaste los filtros</h3>
          <Link to='/' className="menu-item">
            <BsHouse size='2.5em' color="black" className="icono-resultados" />
          </Link>
          <Link to='/tienda' className="menu-item">
            <AiOutlineShop size='2.5em' color="black" className="icono-resultados" />
          </Link>
        </div>
      </>
    )
  }
  if (resultadofiltro === false) {
    return (
      <>
        <div className="resultados">
          <h3>Lo siento, no tenemos repuestos para tu vehículo</h3>
        </div>
      </>
    )
  }
  if (resultadofiltro) {
    return (
      <>
        <div className="resultados">
          <h3>Los resultados de tu busqueda</h3>
          <div className="container-fluid">
            <div className="row">
              {
                filtrados.map((x, i) =>

                  i === 0 ? (null) :
                    (
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
                          años={filtrados[0]}
                          foto={x.images[0].src}
                        />
                      </div>
                    )
                )
              }
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Resultados