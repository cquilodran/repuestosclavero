import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { ProductosProvider } from './context/productos'
import { ProviderUser } from './context/user/ContextUser'


function App() {

  return (
    <ProductosProvider>
      <ProviderUser>
        <Router>
          <Switch>
            {
              routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))
            }
          </Switch>
        </Router>
      </ProviderUser>
    </ProductosProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={
        props => <route.component routes={route.routes} {...props} />
      }
    />
  )
}

export default App;
