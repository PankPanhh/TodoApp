import React from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ newTodo, setNewTodo, onAdd, inputRef }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="Thêm công việc mới"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        ref={inputRef}
        className="flex-grow px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-sky-400 outline-none"
      />
      <button
        type="submit"
        className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md shadow-sm"
        aria-label="Thêm công việc"
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoForm;
