import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li
      data-testid={`todo-${todo.id}`}
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer',
        listStyle: 'none',
        margin: '8px 0'
      }}
      onClick={() => toggleTodo(todo.id)}
    >
      {todo.text}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
        data-testid={`delete-todo-${todo.id}`}
        style={{ marginLeft: '15px', color: 'red' }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;