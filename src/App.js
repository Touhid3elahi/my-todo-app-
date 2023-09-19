import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import TodoList from './components/TodoList';
import TodoDetails from './components/TodoDetails';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch TODO items from the API
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching TODO items:', error);
      });
  }, []); // Empty dependency array to run this effect once

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoList todos={todos} />} />
          <Route path="/todos/:id" element={<TodoDetails todos={todos} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
