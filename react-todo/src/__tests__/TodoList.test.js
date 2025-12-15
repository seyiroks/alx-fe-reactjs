import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('toggles a todo completion status', () => {
    render(<TodoList />);

    const firstTodo = screen.getByTestId('todo-1');

    expect(firstTodo).toHaveAttribute('data-completed', 'false');

    fireEvent.click(firstTodo);

    expect(firstTodo).toHaveAttribute('data-completed', 'true');

    fireEvent.click(firstTodo);

    expect(firstTodo).toHaveAttribute('data-completed', 'false');
  });

  test('deletes a todo', () => {
    render(<TodoList />);

    expect(screen.getByText('Write Tests')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[2]);  // Third todo ("Write Tests")

    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
  });
});