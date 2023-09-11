import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const LoginPage = () => {
  const nameInputEl = useRef(null);
  const passwordInputEl = useRef(null);
  const [authState, setAuthState] = useState('ready');
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      const { username, password } = values;
      axios.post('/v1/api/login', { username, password })
        .then((r) => {
          setAuthState('success');
          const { token } = r.data;
          auth.logIn();
          localStorage.setItem('userId', JSON.stringify({ token }));
          navigate(location?.state?.from?.pathname || '/');
        })
        .catch(() => {
          setAuthState('error');
        });
    },
  });
  const feedbackStyle = { display: authState === 'error' ? 'block' : 'none' };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="../assets/images/avatar.jpg" className="rounded-circle" alt="" />
            </div>
            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Ваш ник"
                  required
                  ref={nameInputEl}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  required
                  ref={passwordInputEl}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <div style={feedbackStyle} className="invalid-feedback">the username or password is incorrect</div>
              </Form.Group>

              <Button variant="outline-primary" type="submit">Войти</Button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <p>Нет аккаунта? Регистрация</p>
          </div>
        </div>
      </div>

    </div>

  );
};

export default LoginPage;
