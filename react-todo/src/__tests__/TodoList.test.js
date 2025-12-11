import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';  // Use fireEvent
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
  // Test 1: Initial render with static todos
  test('renders initial todos from static array', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();  // Check container
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check completed todo has line-through
    const completedTodo = screen.getByText('Write Tests');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  // Test 2: Adding todos
  test('adds a new todo', () => {
    render(<TodoList />);

    const input = screen.getByTestId('new-todo-input');
    const button = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(input).toHaveValue('');  // Clears input
  });

  // Test 3: Toggling and deleting (combined for efficiency, but covers both)
  test('toggles and deletes todos properly', () => {
    render(<TodoList />);

    // Toggle
    const todoItem = screen.getByText('Learn React');
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');

    // Delete
    const deleteButton = screen.getByTestId('delete-todo-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});