import React, { useState } from 'react'
import Modal from 'react-modal'

import './tarjetaproducto.scss'
import { FaWhatsapp } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";

Modal.setAppElement('#root')
const TarjetaProducto = (props) => {
    const { nombre, precio, marca, marca2, modelo, años, foto } = props
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [mensaje, setMensaje] = useState("")
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffaa00',
            transition: '1s  easy',
            color: "white"
        }
    };

    function closeModal() {
        setModalIsOpen(false);
    }
    function createxto(n, a, p) {
        const x = `https://wa.me/56966678588?text=Me%20gustaría%20cotizar%20${n}%20año${a}%20con%20precio%20unitario%20de%20${p}`
        setMensaje(x)
    }
    function eventface(n) {
        // aca dispara el envento de pixel facebook
    }
    return (
        <div className="tarjetaproducto">
            <div className="tarjetaproducto__img">
                <img src={foto} alt="foto producto" className="img-fluid" />
            </div>

            <h2>{nombre}</h2>
            <p><strong>Precio: </strong>{precio}</p>
            <p><strong>Marca: </strong> {marca}</p>
            <p><strong>Marca Vehículo: </strong> {marca2}</p>
            <p><strong>Modelo Vehículo: </strong> {modelo}</p>
            <p><strong>Año Vehículo: </strong> {años}</p>
            <button onClick={() => {
                setModalIsOpen(!modalIsOpen)
                createxto(nombre, años, precio)
            }}>Cotizar WSP</button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                closeTimeoutMS={500}
            >
                <h3>Confirmación</h3>
                <p>¿Efectivamente deseas cotizar via wsp?</p>
                <hr />
                <div className="tarjetaproducto__btnmodal">
                    <a target='blank' href={mensaje}>
                        <FaWhatsapp size="4em" color="white" onClick={() => eventface(nombre)} />
                    </a>
                    <FcCancel size="4em" onClick={() => setModalIsOpen(false)} />
                </div>
            </Modal>
        </div>
    )
}

export default TarjetaProducto