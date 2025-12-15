import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './FormStyles.css'

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

function FormikForm() {
  // Initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  }

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      setStatus({
        type: 'success',
        message: `Registration successful! User ID: ${data.id}`
      })

      // Reset form after successful submission
      resetForm()
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Registration failed. Please try again.'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="registration-form">
      <div className="form-header">
        <h2 className="form-title">Create Account</h2>
        <p className="form-description">
          Powered by Formik with Yup validation schema
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form noValidate>
            {/* Username Field */}
            <div className="form-group">
              <label htmlFor="formik-username" className="form-label">
                Username
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <Field
                  type="text"
                  id="formik-username"
                  name="username"
                  className={`form-input ${errors.username && touched.username ? 'error' : ''}`}
                  placeholder="johndoe"
                  disabled={isSubmitting}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <ErrorMessage name="username">
                {msg => <p className="error-message">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="formik-email" className="form-label">
                Email Address
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <Field
                  type="email"
                  id="formik-email"
                  name="email"
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
              </div>
              <ErrorMessage name="email">
                {msg => <p className="error-message">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="formik-password" className="form-label">
                Password
                <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <Field
                  type="password"
                  id="formik-password"
                  name="password"
                  className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
              <ErrorMessage name="password">
                {msg => <p className="error-message">{msg}</p>}
              </ErrorMessage>
            </div>

            {/* Submit Message */}
            {status && (
              <div className={`submit-message ${status.type}`}>
                {status.type === 'success' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
                <span>{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Registering...</span>
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* Implementation Details */}
      <div className="implementation-note formik">
        <strong>Implementation:</strong> This form uses Formik for state management 
        and form handling, with Yup for schema-based validation. Formik's Field and 
        ErrorMessage components simplify form creation and error display.
      </div>
    </div>
  )
}

export default FormikForm