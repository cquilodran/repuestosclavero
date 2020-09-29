// Layouts

import LayoutHome from '../layouts/layoutsHome';

// Page

import Notfound from '../pages/notfound';
import Home from '../pages/home';
import Despachos from '../pages/despachos';
// import Resultados from '../pages/resultados'
import Sesion from '../pages/sesion'

const routes = [
    {
        path: '/',
        component: LayoutHome,
        exact: false,
        routes: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/despachos',
                component: Despachos,
                exact: true
            },
            {
                path: '/sesion',
                component: Sesion,
                exact: true
            },
            {
                component: Notfound
            }
        ]
    }
]

export default routes;
