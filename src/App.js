import React, { useState } from 'react';
import './App.css';

// --- 1. Utility: Generate a random sticky note color ---
const getRandomColor = () => {
  const colors = [
    '#ffec99', // Light Yellow (Default Note)
    '#a2e2f3', // Light Blue
    '#b4f2a0', // Light Green
    '#f9b0c4', // Light Pink
    '#ffc07d', // Light Orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// --- 2. TodoItem Component ---
// Now accepts a 'color' prop to set its background.
const TodoItem = ({ todo, onDelete }) => {
  return (
    // Apply the inline style for the unique background color
    <li className="todo-note" style={{ backgroundColor: todo.color }}>
      <p className="note-text">{todo.text}</p>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        ❌
      </button>
    </li>
  );
};

// --- 3. App Component (Main Logic) ---
const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Function to handle adding a new to-do item.
  const handleAddTodo = (event) => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      // Assign a random color when creating the new task
      color: getRandomColor(), 
    };

    // Add the new todo to the beginning of the array so new notes appear first
    setTodos([newTodo, ...todos]); 
    setInputValue('');
  };

  // Function to handle deleting a to-do item.
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Sticky Notes To-Do 📌</h1>
      </header>

      {/* Input/Form Section */}
      <div className="input-section">
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="What needs to be stuck on the board?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Stick It!</button>
        </form>
      </div>

      {/* List Display Section - The "Board" */}
      <div className="note-board">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onDelete={handleDeleteTodo} 
          />
        ))}

        {/* Empty state message */}
        {todos.length === 0 && (
          <p className="empty-message">The board is clear! Add a note above. ✨</p>
        )}
      </div>
    </div>
  );
};

export default App;