import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching TODO items:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="todo-list-container">
            <div className="header">
                <h1 className="header-text">Todo List</h1>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search TODOs..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="card-container">
                {filteredTodos.map((todo) => (
                    <Link to={`/todos/${todo.id}`} key={todo.id}>
                        <div
                            className={`todo-card ${todo.completed ? 'completed' : 'not-completed'}`}
                        >
                            <div className="todo-number">#{todo.id}</div>
                            <div className="todo-title">{todo.title.slice(0, 20)}</div>
                            <div className="title-popup">
                                <strong>Title:</strong> {todo.title}
                                <br />
                                <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default TodoList;
