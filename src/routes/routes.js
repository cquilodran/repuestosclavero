// Layouts

import LayoutHome from '../layouts/layoutWeb';

// Page web

import Notfound from '../pages/notfound';
import Home from '../pages/home';
import Despachos from '../pages/despachos';
import Sesion from '../pages/sesion'

// Pages administrador

import LayOutPanelAdministrador from '../layouts/panelAdministrador'
// import LayOutPanelAdministradorData from '../layouts/panelAdministradorDataxxx'
import HomePanelAdministrador from '../pages/panelAdministrador/home'
// import DataPanelAdministrador from '../pages/panelAdministrador/data'
import ProveedoresDataPanelAdministrador from '../pages/panelAdministrador/data/proveedores'
import SucursalesPage from '../pages/panelAdministrador/data/sucursales'
import UsuariosPage from '../pages/panelAdministrador/data/usuarios'
import DocumentosPage from '../pages/panelAdministrador/data/documentos'
import UnidadesPage from '../pages/panelAdministrador/data/unidades'
import LadoVehiculoPage from '../pages/panelAdministrador/data/ladoVehiculo'
import MarcaProductoPage from '../pages/panelAdministrador/data/marcaProducto'
import MarcaVehiculoPage from '../pages/panelAdministrador/data/marcaVehiculo'
import ModeloVehiculoPage from '../pages/panelAdministrador/data/modeloVehiculo'
import CategoriaProdutoPage from '../pages/panelAdministrador/data/categoriaProducto'
import ProductosPage from '../pages/panelAdministrador/data/productos'
import IngresoProveedorPage from '../pages/panelAdministrador/ingresos/proveedor'

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
                path: '/panel-administrador/data/proveedores',
                component: ProveedoresDataPanelAdministrador,
                exact: true
            },
            {
                path: '/panel-administrador/data/sucursales',
                component: SucursalesPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/usuarios',
                component: UsuariosPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/documentos',
                component: DocumentosPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/unidades',
                component: UnidadesPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/lado-vehiculo',
                component: LadoVehiculoPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/marca-producto',
                component: MarcaProductoPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/marca-vehiculo',
                component: MarcaVehiculoPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/modelo-vehiculo',
                component: ModeloVehiculoPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/categorias',
                component: CategoriaProdutoPage,
                exact: true
            },
            {
                path: '/panel-administrador/data/productos',
                component: ProductosPage,
                exact: true
            },
            {
                path: '/panel-administrador/ingresos/proveedor',
                component: IngresoProveedorPage,
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
