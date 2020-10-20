export function reducerUnidades(state, action) {
  const { lista: { docs, limit, page, pages, total } } = action.lista
  // console.log({ docs, limit, page, pages, total })
  switch (action.type) {
    case "ACTUALIZA_LISTA_UNIDADES":

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
    case "BUSCANDO_UNIDADES":
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