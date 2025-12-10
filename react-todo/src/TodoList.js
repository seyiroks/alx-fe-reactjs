import React, { useState } from 'react';

// AddTodoForm Component
const AddTodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="add-todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new todo..."
        data-testid="todo-input"
      />
      <button onClick={handleAdd} data-testid="add-button">
        Add
      </button>
    </div>
  );
};

// TodoItem Component
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        data-testid={`todo-checkbox-${todo.id}`}
      />
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        data-testid={`todo-text-${todo.id}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        data-testid={`delete-button-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
};

// Main TodoList Component
const TodoList = () => {
  // Initialize state with demo todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false },
  ]);

  // Method to add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Method to toggle todo completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Method to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
      
      {todos.length === 0 && <p>No todos yet. Add one above!</p>}
      
      <div>
        <p>
          Total: {todos.length} | Completed: {todos.filter((t) => t.completed).length}
        </p>
      </div>
    </div>
  );
};

export default TodoList;