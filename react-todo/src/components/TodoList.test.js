// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';  // ← Changed from '../App'

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add Todo');

    await user.type(input, 'New Todo Item');
    await user.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('toggles a todo completion status', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const firstTodo = screen.getByTestId('todo-1');

    expect(firstTodo).toHaveAttribute('data-completed', 'false');

    await user.click(firstTodo);

    expect(firstTodo).toHaveAttribute('data-completed', 'true');

    await user.click(firstTodo);

    expect(firstTodo).toHaveAttribute('data-completed', 'false');
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    expect(screen.getByText('Write Tests')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[2]);  // Third todo

    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
  });
});