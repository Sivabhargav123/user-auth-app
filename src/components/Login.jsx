import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'
import img from '../styles/login_imgg.png'
const LoginSchema = Yup.object().shape({
  user_email: Yup.string().email('Invalid email').required('Email is required'),
  user_password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the Sign Up page
  };

  const handleDashBoard=()=>{
    navigate('/dashboard')
  }

  return (
    <div className='total_container'>
      <div className='main1'>
        <div className='img_container'>
          <img src={img} className='imgg'/>
        </div>

      </div>
      <div className='login_container'>
      <h2 className='login_heading'>Log In</h2>
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
            <div className='email_c'>
              <label className='labels'>Email*</label>
              <Field type="email" name="user_email" />
              <ErrorMessage name="user_email" component="div" />
            </div>
            <div className='password_c'>
              <label className='labels'>Password*</label>
              <Field type="password" name="user_password" />
              <ErrorMessage name="user_password" component="div" />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className='buttons_containerr'>
            <button  className="button" type="submit" disabled={isSubmitting}>
              Log In
            </button>
            <button  className="button" type='button' onClick={handleSignUp} >
              Sign Up
            </button>
            <button  className="button" type='button' onClick={handleDashBoard} >
              Dashboard
            </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
      
    </div>
  );
};

export default Login;
