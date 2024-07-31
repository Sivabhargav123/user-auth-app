import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpSchema = Yup.object().shape({
  user_firstname: Yup.string().required('First name is required'),
  user_email: Yup.string().email('Invalid email').required('Email is required'),
  user_phone: Yup.string().required('Phone number is required'),
  user_password: Yup.string().required('Password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className='signup_main_container'>
    
    <div className='signUpContainer'>
      <h2 className='signHeading'>Sign Up</h2>
      <Formik
        initialValues={{
          user_firstname: '',
          user_email: '',
          user_phone: '',
          user_password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = {
            ...values,
            user_lastname: 'Doe', // static data for lastname
            user_city: 'Hyderabad', // static data for city
            user_zipcode: '500072', // static data for zipcode
          };
          axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload)
            .then(response => {
              console.log(response.data);
              localStorage.setItem('user', JSON.stringify(response.data));
              setSubmitting(false);
              navigate('/dashboard');
            })
            .catch(error => {
              console.error(error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='form_container'>
              <label className='labels_sign'>First Name</label>
              <Field type="text" name="user_firstname" />
              <ErrorMessage name="user_firstname" component="div" />
            </div>
            <div className='email_container'>
              <label className='labels_sign'>Email</label>
              <Field type="email" name="user_email" />
              <ErrorMessage name="user_email" component="div" />
            </div>
            <div className='phone_container'>
              <label className='labels_sign'>Phone</label>
              <Field type="text" name="user_phone" />
              <ErrorMessage name="user_phone" component="div" />
            </div>
            <div className='password_container'>
              <label  className='labels_sign'>Password</label>
              <Field type="password" name="user_password" />
              <ErrorMessage name="user_password" component="div" />
            </div>
            <button className='button' type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default SignUp;
