import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submitting to mock API:', values);
    alert('Registration submitted successfully!');
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>User Registration (Formik)</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;