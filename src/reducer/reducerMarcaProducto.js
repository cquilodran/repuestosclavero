export function reducerMarcaProducto(state, action) {
  const { lista: { docs, limit, page, pages, total } } = action.lista
  switch (action.type) {
    case "ACTUALIZA_LISTA_MARCA_PRODUCTO":

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
    case "BUSCANDO_MARCA_PRODUCTO":
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