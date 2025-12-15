import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; // Since our component is in App.jsx

// Optional: You can rename the component if needed, but this works

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<App />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add Todo');

    await user.type(input, 'New Todo Item');
    await user.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('toggles a todo completion status', async () => {
  const user = userEvent.setup();
  render(<App />);

  // Find the first todo (id: 1 → "Learn React")
  const firstTodo = screen.getByTestId('todo-1');

  // Initially not completed
  expect(firstTodo).toHaveAttribute('data-completed', 'false');

  await user.click(firstTodo);

  // Now completed
  expect(firstTodo).toHaveAttribute('data-completed', 'true');

  await user.click(firstTodo);

  // Toggle back
  expect(firstTodo).toHaveAttribute('data-completed', 'false');
});

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Ensure "Write Tests" exists
    expect(screen.getByText('Write Tests')).toBeInTheDocument();

    // Find the Delete button next to "Write Tests"
    const deleteButtons = screen.getAllByText('Delete');
    // Click the third one (corresponding to "Write Tests")
    await user.click(deleteButtons[2]);

    expect(screen.queryByText('Write Tests')).not.toBeInTheDocument();
  });
});