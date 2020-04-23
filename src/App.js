import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { ProductosProvider } from './context/productos'


function App() {

  return (
      <ProductosProvider>
        <Router>
          <Switch>
            {
              routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))
            }
          </Switch>
        </Router>
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
