import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

// A helper function to get the current list of todos in the document
const getTodoItems = () => screen.queryAllByTestId(/todo-item-\d+/); 

describe('TodoList Component Tests', () => {

  // --- Test 1: Initial Render Test ---
  test('1. Verify TodoList component renders and shows initial todos', () => {
    render(<TodoList />);
    
    // Check for the main heading
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();

    // Check that the initial 3 todos are rendered
    expect(screen.getByText(/Learn React Testing Library/i)).toBeInTheDocument();
    expect(screen.getByText(/Implement AddTodoForm/i)).toBeInTheDocument();
    expect(screen.getByText(/Write Jest tests for all features/i)).toBeInTheDocument();
    
    // Check the count of list items
    expect(getTodoItems()).toHaveLength(3); 
  });


  // --- Test 2: Test Adding Todos ---
  test('2. Verify that a new todo can be added successfully', () => {
    render(<TodoList />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    const newTodoText = 'Buy groceries';

    // 1. Simulate user typing into the input
    fireEvent.change(input, { target: { value: newTodoText } });
    expect(input.value).toBe(newTodoText);

    // 2. Simulate form submission (clicking the Add button)
    fireEvent.click(addButton);

    // 3. Verify the new todo is in the document
    expect(screen.getByText(newTodoText)).toBeInTheDocument();
    
    // 4. Verify the total number of items has increased from 3 to 4
    expect(getTodoItems()).toHaveLength(4);

    // 5. Verify the input field is cleared after submission
    expect(input.value).toBe('');
  });


  // --- Test 3: Test Toggling Todos ---
  test('3. Verify that a todo item can be toggled between completed/not completed', () => {
    render(<TodoList />);
    
    // We target the second todo which is NOT completed initially
    const todoToToggle = screen.getByText(/Implement AddTodoForm/i);

    // 1. Initial state check: Should NOT have 'line-through' style (not completed)
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');

    // 2. Simulate clicking the todo item to toggle it
    fireEvent.click(todoToToggle);

    // 3. Check for the completed state: Should NOW have 'line-through' style
    expect(todoToToggle).toHaveStyle('text-decoration: line-through');

    // 4. Simulate clicking the todo item again to toggle it back
    fireEvent.click(todoToToggle);

    // 5. Check for the uncompleted state: Should NOT have 'line-through' style again
    expect(todoToToggle).not.toHaveStyle('text-decoration: line-through');
  });


  // --- Test 4: Test Deleting Todos ---
  test('4. Verify that a todo item can be deleted', () => {
    render(<TodoList />);

    // Get all initial todos (3 items)
    let initialTodos = getTodoItems();
    expect(initialTodos).toHaveLength(3);

    // Target the first todo's text and its corresponding delete button
    const todoTextToDelete = /Learn React Testing Library/i;
    const deleteButton = screen.getByTestId('delete-button-1');

    // 1. Ensure the item is present before deletion
    expect(screen.getByText(todoTextToDelete)).toBeInTheDocument();

    // 2. Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // 3. Verify the item is removed from the document
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();

    // 4. Verify the total number of items has decreased from 3 to 2
    expect(getTodoItems()).toHaveLength(2);
  });
});