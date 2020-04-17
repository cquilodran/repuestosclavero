import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './layoutTienda.scss';

const LayoutTienda = (props) => {
    const { routes } = props;

    return (
        <div>
            <div>
                Estamos en lay out Tienda
            </div>
            <hr/>
            <LoadRoutes routes={routes} />
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
export default LayoutTienda