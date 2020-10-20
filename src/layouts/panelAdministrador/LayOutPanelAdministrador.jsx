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
  // if (usuario.cargando) {
  //   return (
  //     <Spinner
  //       as="span"
  //       animation="grow"
  //       size="md"
  //       role="status"
  //       aria-hidden="true"
  //     />
  //   )
  // }
  // if (usuario.user_id === false) {
  //   console.log("Estamos ak");
  //   return (
  //     <>
  //       <Route path="/sesion" component={Sesion} />
  //       <Redirect to="/sesion" />
  //     </>
  //   )
  // }
  return (
    // <div className="body">
    <div className="">
      {
        usuario.user_id &&
        <>
          <Header />
          <LoadRoutes routes={routes} />
          <Footer />
        </>
      }
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
export default LayOutPanelAdministrador;