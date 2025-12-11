import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

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

    const input = screen.getByTestId('new-todo-input');
    const button = screen.getByTestId('add-todo-button');

    await user.type(input, 'New Todo');
    await user.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles a todo when clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const todoItem = screen.getByText('Learn React');
    expect(todoItem).not.toHaveStyle({ textDecoration: 'line-through' });

    await user.click(todoItem);
    expect(todoItem).toHaveStyle({ textDecoration: 'line-through' });

    await user.click(todoItem);
    expect(todoItem).not.toHaveStyle({ textDecoration: 'line-through' });
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const deleteButton = screen.getByTestId('delete-todo-1');
    await user.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});