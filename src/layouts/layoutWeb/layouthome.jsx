import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Componentes
import Header from '../../components/header'
import Footer from '../../components/footer'

import './layouthome.scss';

const LayoutHome = (props) => {
    const { routes } = props;

    return (
        <div>
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
                    />
                ))
            }
        </Switch>)
}
export default LayoutHome;