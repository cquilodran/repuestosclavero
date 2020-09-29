// Layouts

import LayoutHome from '../layouts/layoutsHome';

// Page web

import Notfound from '../pages/notfound';
import Home from '../pages/home';
import Despachos from '../pages/despachos';
import Sesion from '../pages/sesion'

// Pages administrador

import LayOutPanelAdministrador from '../layouts/panelAdministrador'
import HomePanelAdministrador from '../pages/panelAdministrador/home'

const routes = [
    {
        path: '/panel-administrador',
        component: LayOutPanelAdministrador,
        exact: false,
        routes: [
            {
                path: '/',
                component: HomePanelAdministrador,
                exact: true
            }
        ]
    },
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
