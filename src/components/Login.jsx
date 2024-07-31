import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  user_email: Yup.string().email('Invalid email').required('Email is required'),
  user_password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <div>
      <h2>Log In</h2>
      <Formik
        initialValues={{
          user_email: '',
          user_password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          axios.post('https://syoft.dev/Api/userlogin/api/userlogin', values)
            .then(response => {
              if (response.data.status) {
                localStorage.setItem('user', JSON.stringify(response.data.user_data));
                navigate('/dashboard');
              } else {
                setErrorMessage(response.data.msg || 'Invalid credentials');
              }
              setSubmitting(false);
            })
            .catch(error => {
              console.error(error);
              setErrorMessage('An error occurred. Please try again.');
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="user_email" />
              <ErrorMessage name="user_email" component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="user_password" />
              <ErrorMessage name="user_password" component="div" />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" disabled={isSubmitting}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
