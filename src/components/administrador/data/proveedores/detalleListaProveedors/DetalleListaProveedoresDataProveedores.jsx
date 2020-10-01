import React from 'react'
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Pencil, ClipboardCheck, ClipboardX, Eye } from 'react-bootstrap-icons'

const DetalleListaProveedoresDataProveedores = ({ data }) => {
  const { ok, message, proveedores } = data
  const heads = ["Activo", "Nombre", "Celular", "Acciones"]
  console.log(proveedores)


  const activarDesactivar = async (id, estado) => {
    console.log(id)
    console.log(!estado)
  }
  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {
              heads.map((x, i) =>
                x === "Acciones" ?
                  <th key={i} colSpan="3" >
                    {x}
                  </th>
                  :
                  <th key={i} >
                    {x}
                  </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            proveedores.docs.map((y, z) =>
              <tr key={z} className={y.activo ? "" : "text-danger"}>
                {
                  y.activo ?
                    <td>Sí</td>
                    :
                    <td>No</td>
                }
                <td>{y.nombre}</td>
                <td>{y.celular}</td>
                <td><Pencil width="1.5em" size="1.5em" /></td>
                <td>
                  {
                    y.activo ?
                      <OverlayTrigger
                        key={'top'}
                        overlay={
                          <Tooltip >
                            Desactivar
                            </Tooltip>
                        }
                      >
                        < ClipboardCheck
                          width="1.5em"
                          size="1.5em"
                          onClick={() => activarDesactivar(y._id, y.activo)}
                        />
                      </OverlayTrigger>
                      :
                      <OverlayTrigger
                        key={'top'}
                        overlay={
                          <Tooltip >
                            Activar
                            </Tooltip>
                        }
                      >
                        <ClipboardX
                          width="1.5em"
                          size="1.5em"
                          onClick={() => activarDesactivar(y._id, y.activo)}
                        />
                      </OverlayTrigger>
                  }
                </td>
                <td><Eye width="1.5em" size="1.5em" /></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default DetalleListaProveedoresDataProveedores
