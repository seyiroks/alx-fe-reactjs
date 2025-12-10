// src/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    
    // Check title
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo when add button is clicked', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add new todo
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);
    
    // Verify todo was added
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Verify input was cleared
    expect(input.value).toBe('');
  });

  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Should still have only 3 initial todos
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
  });

  test('toggles todo completion when checkbox is clicked', () => {
    render(<TodoList />);
    
    const checkbox = screen.getByTestId('todo-checkbox-1');
    const todoText = screen.getByTestId('todo-text-1');
    
    // Initially unchecked
    expect(checkbox).not.toBeChecked();
    expect(todoText).toHaveStyle('text-decoration: none');
    
    // Click to complete
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click to uncomplete
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('toggles todo completion when text is clicked', () => {
    render(<TodoList />);
    
    const checkbox = screen.getByTestId('todo-checkbox-2');
    const todoText = screen.getByTestId('todo-text-2');
    
    // Initially unchecked
    expect(checkbox).not.toBeChecked();
    
    // Click text to complete
    fireEvent.click(todoText);
    expect(checkbox).toBeChecked();
    
    // Click text to uncomplete
    fireEvent.click(todoText);
    expect(checkbox).not.toBeChecked();
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Verify todo exists
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    
    // Delete the todo
    const deleteButton = screen.getByTestId('delete-button-2');
    fireEvent.click(deleteButton);
    
    // Verify todo was deleted
    expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
    
    // Verify other todos still exist
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('deletes all todos', () => {
    render(<TodoList />);
    
    // Delete all todos
    fireEvent.click(screen.getByTestId('delete-button-1'));
    fireEvent.click(screen.getByTestId('delete-button-2'));
    fireEvent.click(screen.getByTestId('delete-button-3'));
    
    // Should show empty message
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  test('displays correct number of todos', () => {
    render(<TodoList />);
    
    // Initially 3 todos
    let todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
    
    // Add a todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    fireEvent.change(input, { target: { value: 'Fourth Todo' } });
    fireEvent.click(addButton);
    
    // Should now have 4 todos
    todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(4);
  });

  test('handles complete workflow', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // Add todo
    fireEvent.change(input, { target: { value: 'Workflow Test' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Workflow Test')).toBeInTheDocument();
    
    // Find the new todo's checkbox (it will be the last one)
    const checkboxes = screen.getAllByRole('checkbox');
    const newCheckbox = checkboxes[checkboxes.length - 1];
    
    // Toggle it
    fireEvent.click(newCheckbox);
    expect(newCheckbox).toBeChecked();
    
    // Find and click delete button (it will be the last one)
    const deleteButtons = screen.getAllByText('Delete');
    const newDeleteButton = deleteButtons[deleteButtons.length - 1];
    fireEvent.click(newDeleteButton);
    
    // Verify deleted
    expect(screen.queryByText('Workflow Test')).not.toBeInTheDocument();
  });
});