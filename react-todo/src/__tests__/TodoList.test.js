// src/__tests__/TodoList.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';
import '@testing-library/jest-dom';

// Mock child components to isolate TodoList testing
jest.mock('../AddTodoForm', () => ({
  __esModule: true,
  default: function MockAddTodoForm({ onAdd }) {
    return (
      <>
        <input data-testid="new-todo-input" />
        <button data-testid="add-todo-button" onClick={() => onAdd('New Todo')}>
          Add Todo
        </button>
      </>
    );
  },
}));

jest.mock('../Todo', () => ({
  __esModule: true,
  default: function MockTodo({ todo, onToggle, onDelete }) {
    return (
      <li>
        <span
          data-testid={`todo-${todo.id}`}
          onClick={() => onToggle(todo.id)}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </li>
    );
  },
}));

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const addButton = screen.getByTestId('add-todo-button');
    fireEvent.click(addButton);
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);
    const todoItem = screen.getByTestId('todo-3'); // "Write Tests" is initially completed
    expect(todoItem).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const firstDeleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(firstDeleteButton);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});