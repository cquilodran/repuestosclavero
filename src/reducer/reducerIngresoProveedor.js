export function reducerIngresoProveedor(state, action) {
  const { lista: { docs, limit, page, pages, total } } = action.lista

  switch (action.type) {
    case "ACTUALIZA_LISTA_INGRESO_PROVEEDOR":
      return {
        ...state,
        docs: docs,
        limit: limit,
        page: page,
        pages: pages,
        total: total,
        actualizando: false,
        busqueda: false,
        nDocumento: null,
        proveedor: null,
        documento: null,
      }
    case "BUSCANDO_INGRESO_PROVEEDOR":
      const { nDocumento, proveedor, documento } = action.lista
      return {
        ...state,
        docs: docs,
        limit: limit,
        page: page,
        pages: pages,
        total: total,
        actualizando: false,
        busqueda: true,
        nDocumento: nDocumento,
        proveedor: proveedor,
        documento: documento,
      }
    case "CARGANDO":
      return {
        ...state,
        actualizando: true,
      }
    default:
      return state
  }
}