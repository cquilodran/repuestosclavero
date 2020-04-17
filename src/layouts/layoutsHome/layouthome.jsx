import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Componentes
import Header from '../../components/header'
import Footer from '../../components/footer'

import { Row, Col } from 'antd'
import './layouthome.scss';

const LayoutHome = (props) => {
    const { routes } = props;

    return (
        <div>
            <Header />
            <hr />
            <LoadRoutes routes={routes} />
            <hr />
            <Footer />
            {/* <Row>
                <Col md={1} />
                <Col sm={0}>
                    Texto de prueba
                </Col>
                <Col xs={20} lg={0}>
                    <div>
                        <h2>Aca va el header del lay out estandar</h2>
                        <p>LG = 0 y xs = 10</p>
                    </div>

                    <div>
                        <h2>Aca va el footer del lay out estandar</h2>
                    </div>
                </Col>
                <hr/>
                    <LoadRoutes routes={routes} />
                    <hr/>
                <Col xs={0} lg={20}>
                    <div>
                        <h2>Aca va el header del lay out estandar</h2>
                        <p>LG = 20 y XS = 0</p>
                    </div>
                    <hr/>
                    <LoadRoutes routes={routes} />
                    <hr/>
                    <div>
                        <h2>Aca va el footer del lay out estandar</h2>
                    </div>
                </Col>
                <Col md={2} />
            </Row> */}

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