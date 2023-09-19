import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './TodoDetails.css'; // Import the CSS file

function TodoDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch TODO item details from the API
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
        // Fetch user details using the user ID from the todo item
        axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`)
          .then((userResponse) => {
            setUser(userResponse.data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching TODO item details:', error);
      });
  }, [id]);

  return (
    <div className="todo-details-container">
      <h2>Todo Item Details</h2>
      <div className="todo-details">
        <div className="todo-detail">
          <strong>User Name:</strong> {user.name}
        </div>
        <div className="todo-detail">
          <strong>Item Number:</strong> {todo.id}
        </div>
        <div className="todo-detail">
          <strong>Item Title:</strong> {todo.title}
        </div>
      </div>
      <Link to="/">Back to TODO List</Link>
    </div>
  );
}

export default TodoDetails;
