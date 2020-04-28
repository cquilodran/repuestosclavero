import Axios from 'axios'

export function getProductosPaginado(limit, page) {
  const url = `${process.env.REACT_APP_API_ENDPOINT_PRODUCTS}/${process.env.REACT_APP_API_ENDPOINT_VERSION}/products`

  return (
    Axios({
      method: 'get',
      url: url,
      aut: {
        username: process.env.REACT_APP_API_ENDPOINT_USER,
        password: process.env.REACT_APP_API_ENDPOINT_PASSWORD
      },
      params: {
        per_page: limit,
        page: page
      }
    })
      .then(response => {
        return response.json()
      })
      // .then(result => {
      //   return result
      // })
      .catch(err => {
        return err
      })
  )
}

