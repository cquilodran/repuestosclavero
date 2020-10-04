
export function reducerProveedores(state, action) {
  const { proveedores: { docs, limit, page, pages, total } } = action.lista

  switch (action.type) {
    case "ACTUALIZA_LISTA_PROVEEDORES":
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
    case "BUSQUEDA_PROVEEDORES":

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
    default:
      return state
  }
}
