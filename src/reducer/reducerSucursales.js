export function reducerSucursales(state, action) {
  console.log(action.lista);
  const { lista: { docs, limit, page, pages, total } } = action.lista

  switch (action.type) {
    case "ACTUALIZA_LISTA_SUCURSALES":
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
    case "BUSCANDO_SUCURSALES":
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