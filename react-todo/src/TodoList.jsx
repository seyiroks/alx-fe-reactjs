import React, { useState } from 'react';

// Initial state with a few demonstration todos
const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: true },
  { id: 2, text: 'Implement AddTodoForm', completed: false },
  { id: 3, text: 'Write Jest tests for all features', completed: false },
];

let nextId = initialTodos.length + 1;

// --- TodoList Component ---
const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  // 1. Add Todo Logic
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return; // Prevent adding empty todos

    const newTodo = {
      id: nextId++,
      text: newTodoText.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText(''); // Clear input after adding
  };

  // 2. Toggle Todo Logic (by clicking the list item)
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 3. Delete Todo Logic
  const deleteTodo = (id) => {
    // Stop the click event from propagating to the list item's toggle function
    // This is important because the button is inside the clickable list item.
    return (e) => {
        e.stopPropagation(); 
        setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* AddTodoForm Implementation */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
          // We use data-testid for easy selection in tests
          data-testid="todo-input" 
        />
        <button type="submit" data-testid="add-button">Add</button>
      </form>

      {/* Todo List Display */}
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            // Use onClick to implement the toggle functionality
            onClick={() => toggleTodo(todo.id)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'gray' : 'black',
            }}
            // Use data-testid for testing specific list items
            data-testid={`todo-item-${todo.id}`}
          >
            {todo.text}
            <button 
              onClick={deleteTodo(todo.id)} 
              data-testid={`delete-button-${todo.id}`}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;