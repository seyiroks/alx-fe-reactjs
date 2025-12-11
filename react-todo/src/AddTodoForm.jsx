// src/AddTodoForm.jsx
import { useState } from 'react';

function AddTodoForm({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        data-testid="new-todo-input"
      />
      <button type="submit" data-testid="add-todo-button">
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;