import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import FormikForm from './components/formikForm'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('controlled')

  return (
    <div className="app-container">
      <div className="content-wrapper fade-in">
        <header className="app-header">
          <h1 className="app-title">User Registration</h1>
          <p className="app-subtitle">
            Exploring form handling with controlled components and Formik
          </p>
        </header>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'controlled' ? 'active' : ''}`}
            onClick={() => setActiveTab('controlled')}
          >
            <span className="tab-number">01</span>
            <span className="tab-label">Controlled Components</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'formik' ? 'active' : ''}`}
            onClick={() => setActiveTab('formik')}
          >
            <span className="tab-number">02</span>
            <span className="tab-label">Formik Implementation</span>
          </button>
        </div>

        <div className="form-container">
          {activeTab === 'controlled' ? (
            <RegistrationForm key="controlled" />
          ) : (
            <FormikForm key="formik" />
          )}
        </div>
      </div>
    </div>
  )
}

export default App