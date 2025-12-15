import { useState } from 'react'
import './FormStyles.css'

function RegistrationForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  // State for errors
  const [errors, setErrors] = useState({})

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(null)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitMessage(null)

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      setSubmitMessage({
        type: 'success',
        text: `Registration successful! User ID: ${data.id}`
      })

      // Reset form
      setFormData({
        username: '',
        email: '',
        password: ''
      })
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Registration failed. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="registration-form">
      <div className="form-header">
        <h2 className="form-title">Create Account</h2>
        <p className="form-description">
          Managed with React controlled components and useState
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
            <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'error' : ''}`}
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
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
            <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
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
          {errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
            <span className="required">*</span>
          </label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
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
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        {/* Submit Message */}
        {submitMessage && (
          <div className={`submit-message ${submitMessage.type}`}>
            {submitMessage.type === 'success' ? (
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
            <span>{submitMessage.text}</span>
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
      </form>

      {/* Implementation Details */}
      <div className="implementation-note">
        <strong>Implementation:</strong> This form uses React's useState hook to manage 
        form state and implements custom validation logic. Each input is a controlled 
        component with its value tied to the component state.
      </div>
    </div>
  )
}

export default RegistrationForm