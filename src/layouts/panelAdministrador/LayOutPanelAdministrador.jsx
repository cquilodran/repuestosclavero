import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { Route, Switch, Redirect } from 'react-router-dom';
import { ContextUserContext } from '../../context/user/ContextUser'
// import { Spinner } from 'react-bootstrap'

// Componentes
import Header from '../../components/administrador/header'
import Footer from '../../components/administrador/footer'
// import Sesion from '../../pages/sesion'


const LayOutPanelAdministrador = (props) => {
  const { usuario } = useContext(ContextUserContext)
  const { routes } = props
  if (usuario === null) {
    return (
      <h1>Cargando....</h1>
    )
  }
  return (
    // <div className="body">
    <div className="">
      <Header />
      <LoadRoutes routes={routes} />
      <Footer />
    </div>
  )
}

function LoadRoutes(props) {
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
          // render={
          //   props =>
          //     <route.component subroutes={route.subroutes} />
          // }
          />
        ))
      }
    </Switch>)
}
export default React.memo(LayOutPanelAdministrador)