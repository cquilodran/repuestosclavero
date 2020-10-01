// Layouts

import LayoutHome from '../layouts/layoutWeb';

// Page web

import Notfound from '../pages/notfound';
import Home from '../pages/home';
import Despachos from '../pages/despachos';
import Sesion from '../pages/sesion'

// Pages administrador

import LayOutPanelAdministrador from '../layouts/panelAdministrador'
import LayOutPanelAdministradorData from '../layouts/panelAdministradorData'
import HomePanelAdministrador from '../pages/panelAdministrador/home'
import DataPanelAdministrador from '../pages/panelAdministrador/data'
import ProveedoresDataPanelAdministrador from '../pages/panelAdministrador/data/proveedores'
const routes = [
    {
        path: '/panel-administrador',
        component: LayOutPanelAdministrador,
        exact: false,
        routes: [
            {
                path: '/panel-administrador/home',
                component: HomePanelAdministrador,
                exact: true
            },
            {
                path: '/panel-administrador/data',
                component: LayOutPanelAdministradorData,
                exact: false,
                subroutes: [
                    {
                        path: '/panel-administrador/data/proveedores',
                        component: ProveedoresDataPanelAdministrador,
                        exact: true
                    }
                ]
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
