import React from 'react';
import TodoList from './TodoList';
import './App.css'; // Assuming you keep the default CSS

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React Todo Application</h1>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;