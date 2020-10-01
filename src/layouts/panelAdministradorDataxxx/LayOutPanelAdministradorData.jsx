import React from 'react'
import { Route, Switch } from 'react-router-dom';


const LayOutPanelAdministradorData = (props) => {
  const { routes } = props
  console.log(props);
  return (
    <div>

      {/* <Header /> */}
      <h3>Header</h3>
      <LoadRoutes routes={routes} />
      {/* <Footer /> */}
      <h3>Footer</h3>

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
          />
        ))
      }
    </Switch>)

}

export default LayOutPanelAdministradorData
