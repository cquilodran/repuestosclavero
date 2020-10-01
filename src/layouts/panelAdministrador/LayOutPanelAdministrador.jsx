import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ContextUserContext } from '../../context/user/ContextUser'

// Componentes
import Header from '../../components/administrador/header'
import Footer from '../../components/administrador/footer'


const LayOutPanelAdministrador = (props) => {
  const { usuario } = useContext(ContextUserContext)
  const { routes } = props
  return (
    <div>
      {
        usuario.user_id ?
          <>
            <Header />
            <LoadRoutes routes={routes} />
            <Footer />
          </>
          :
          "Cargando"
      }
    </div>
  )
}

function LoadRoutes(props) {
  console.log(props);

  const { routes } = props;
  return (
    <Switch>
      {
        routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
            routes={routes}
          />
        ))
      }
    </Switch>)
}
export default LayOutPanelAdministrador;