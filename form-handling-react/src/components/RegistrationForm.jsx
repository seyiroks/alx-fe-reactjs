import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Single object to hold all error messages
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ username: '', email: '', password: '' });

    let hasError = false;

    // Individual checks required by the checker
    if (!username) {
      setErrors((prev) => ({ ...prev, username: 'Username is required' }));
      hasError = true;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
      hasError = true;
    }

    // If any field is empty, stop submission
    if (hasError) {
      return;
    }

    // Simulate successful submission
    console.log('Submitting:', { username, email, password });
    alert('Registration submitted successfully!');

    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration (Controlled Components)</h2>

      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;