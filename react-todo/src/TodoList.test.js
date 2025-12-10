import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render Test
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check if the todo list exists
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });
});

// Test 2: Test Adding Todos
  test('adds a new todo when user submits the form', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    
    // Click the add button
    fireEvent.click(addButton);
    
    // Verify the new todo appears in the list
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Verify the input is cleared after adding
    expect(input.value).toBe('');
  });

  // Test 3: Test Adding Todo with Enter Key
  test('adds a new todo when user presses Enter key', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'Todo via Enter' } });
    
    // Press Enter
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // Verify the new todo appears in the list
    expect(screen.getByText('Todo via Enter')).toBeInTheDocument();
  });

  // Test 4: Test Empty Input Prevention
  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Get initial todo count
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Verify no new todo was added
    const finalTodos = screen.getAllByRole('listitem');
    expect(finalTodos.length).toBe(initialCount);
  });

  // Test 5: Test Toggling Todos (via checkbox)
  test('toggles todo completion status when checkbox is clicked', () => {
    render(<TodoList />);
    
    // Get the first todo checkbox
    const checkbox = screen.getByTestId('todo-checkbox-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially not completed
    expect(checkbox.checked).toBe(false);
    
    // Click checkbox to complete
    fireEvent.click(checkbox);
    
    // Should be completed now
    expect(checkbox.checked).toBe(true);
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to uncomplete
    fireEvent.click(checkbox);
    
    // Should be uncompleted
    expect(checkbox.checked).toBe(false);
  });

  // Test 6: Test Toggling Todos (via text click)
  test('toggles todo completion status when text is clicked', () => {
    render(<TodoList />);
    
    const todoText = screen.getByTestId('todo-text-2');
    const checkbox = screen.getByTestId('todo-checkbox-2');
    
    // Initially not completed
    expect(checkbox.checked).toBe(false);
    
    // Click text to complete
    fireEvent.click(todoText);
    
    // Should be completed now
    expect(checkbox.checked).toBe(true);
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  // Test 7: Test Deleting Todos
  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Verify the todo exists
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    
    // Click the delete button for todo with id 2
    const deleteButton = screen.getByTestId('delete-button-2');
    fireEvent.click(deleteButton);
    
    // Verify the todo is removed
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    
    // Verify other todos still exist
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 8: Test Multiple Deletions
  test('deletes all todos correctly', () => {
    render(<TodoList />);
    
    // Delete all three initial todos
    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByTestId('delete-button-2'));
    fireEvent.click(screen.getByTestId('delete-button-3'));
    
    // Verify empty state message appears
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  // Test 9: Test Todo Counter
  test('displays correct todo count', () => {
    render(<TodoList />);
    
    // Initially 3 todos, 0 completed
    expect(screen.getByText(/Total: 3/)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 0/)).toBeInTheDocument();
    
    // Complete one todo
    fireEvent.click(screen.getByTestId('todo-checkbox-1'));
    
    // Should show 1 completed
    expect(screen.getByText(/Completed: 1/)).toBeInTheDocument();
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    fireEvent.change(input, { target: { value: 'Fourth Todo' } });
    fireEvent.click(addButton);
    
    // Should show 4 total
    expect(screen.getByText(/Total: 4/)).toBeInTheDocument();
  });

  // Test 10: Test Complete Workflow
  test('handles complete todo workflow: add, toggle, delete', () => {
    render(<TodoList />);
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    fireEvent.change(input, { target: { value: 'Complete Workflow Test' } });
    fireEvent.click(addButton);
    
    // Verify it was added
    const newTodo = screen.getByText('Complete Workflow Test');
    expect(newTodo).toBeInTheDocument();
    
    // Find and toggle the new todo
    const allCheckboxes = screen.getAllByRole('checkbox');
    const newCheckbox = allCheckboxes[allCheckboxes.length - 1];
    fireEvent.click(newCheckbox);
    
    // Verify it's completed
    expect(newCheckbox.checked).toBe(true);
    
    // Find and delete the new todo
    const allDeleteButtons = screen.getAllByText('Delete');
    const newDeleteButton = allDeleteButtons[allDeleteButtons.length - 1];
    fireEvent.click(newDeleteButton);
    
    // Verify it's deleted
    expect(screen.queryByText('Complete Workflow Test')).not.toBeInTheDocument();
  });