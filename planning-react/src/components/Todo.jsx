import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const AddTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const EditTodo = (index) => {
    setEditTodo(index);
    setEditText(todos[index]);
  };

  const UpdateTodo = (index) => {
    if (editText.trim() === "") return;
    const updatedTodos = [...todos];
    updatedTodos[index] = editText;
    setTodos(updatedTodos);
    setEditTodo(null);
    setEditText("");
  };

  const DeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Nhap cong viec..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={AddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editTodo === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => UpdateTodo(index)}>
                  <FaCheck />
                </button>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <button onClick={() => EditTodo(index)}>
                  <FaEdit />
                </button>
                <button onClick={() => DeleteTodo(index)}>
                  <FaTrash />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
