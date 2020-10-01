import React, { useEffect, useContext, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { iniciarSesion } from '../../api/iniciarSesion'
import { } from '../../api/auth'
import { ContextUserContext } from '../../context/user/ContextUser'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../api/config'


const Sesion = () => {
  const { usuario } = useContext(ContextUserContext)
  console.log(usuario);
  const { register, errors, handleSubmit } = useForm()
  const onSubmit = async data => {
    const resultado = await iniciarSesion(data)
    console.log(resultado)
    if (resultado.ok) {
      localStorage.setItem(ACCESS_TOKEN, resultado.accessToken)
      localStorage.setItem(REFRESH_TOKEN, resultado.refreshToken)
      window.location.href = '/panel-administrador/home'
    } else {
      alert(resultado.message)
    }
  }

  useEffect(() => {
    if (usuario.user_id) {
      window.location.href = '/panel-administrador/home'
    }
    return () => {
    }
  }, [usuario])
  return (
    <div className="pt-5">
      <Container className='pt-5'>
        <Row className='pt-5'>
          <Col>
            <h2 className='text-center'>Ingresa al sistema</h2>
          </Col>
        </Row>
      </Container>
      <Container className="pt-5">
        <Row className='justify-content-center'>
          <Col md='auto'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  ref={register({
                    required: {
                      value: true,
                      message: "Email es obligatorio"
                    }
                  })}
                />
                {
                  errors.email && <span className='text-danger text-small d-block my-1'>{errors.email.message}</span>
                }
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name='password'
                  ref={register({
                    required: {
                      value: true,
                      message: "Contraseña es obligatorio"
                    }
                  })}
                />
                {
                  errors.password && <span className='text-danger text-small d-block my-1'>{errors.password.message}</span>
                }
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Sesion