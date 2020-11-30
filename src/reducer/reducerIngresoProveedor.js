export function reducerIngresoProveedor(state, action) {
  // console.log({ docs, limit, page, pages, total })
  // const { lista: { docs = [], limit = 10, page = 1, pages = 1, total = 1 } } = action.lista
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
        busqueda: false
      }
    case "BUSCANDO_INGRESO_PROVEEDOR":
      // const { lista: { docs, limit, page, pages, total } } = action.lista
      return {
        ...state,
        docs: docs,
        limit: limit,
        page: page,
        pages: pages,
        total: total,
        actualizando: false,
        busqueda: true
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