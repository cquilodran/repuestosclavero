// Layouts

import LayoutHome from '../layouts/layoutsHome';
import LayoutTienda from '../layouts/layoutTienda';

// Page

import Notfound from '../pages/notfound';
import Home from '../pages/home';
import Despachos from '../pages/despachos';
import Tienda from '../pages/tienda';
import Productos from '../pages/productos';

const routes = [
    {
        path: '/tienda',
        component: LayoutTienda,
        exact: false,
        routes: [
            {
                path: '/tienda',
                component: Tienda,
                exact: true
            },
            {
                path: '/tienda/productos',
                component: Productos,
                exact: true
            },
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
                component: Notfound
            }
        ]
    },
    
    
]

export default routes;
