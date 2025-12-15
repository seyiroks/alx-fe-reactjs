import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Form Handling in React</h1>
      
      <section style={{ marginBottom: '60px' }}>
        <RegistrationForm />
      </section>
      
      <section>
        <FormikForm />
      </section>
    </div>
  );
}

export default App;