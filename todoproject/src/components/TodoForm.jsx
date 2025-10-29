import React, { useState } from 'react';
import { PlusIcon } from './Icons';

/**
 * Form để thêm công việc mới.
 * @param {object} props
 * @param {function(string): void} props.addTodo - Hàm để thêm todo mới.
 */
const TodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate và thêm todo (logic validate đã được chuyển lên App)
    addTodo(inputValue);
    setInputValue(''); // Xoá input sau khi thêm
  };

  const isEmpty = inputValue.trim() === '';

  return (
  <form onSubmit={handleSubmit} className="flex mb-6 rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200 dark:border-transparent dark:bg-gray-700/50">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Thêm công việc mới..."
        aria-label="Nội dung công việc"
        className="flex-grow px-4 py-3 text-base sm:text-lg bg-white text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400 dark:border-transparent dark:focus:ring-blue-500/40 transition-all duration-200"
      />
      <button
        type="submit"
        title="Thêm công việc"
        aria-label="Thêm công việc"
        disabled={isEmpty}
        className={`flex-shrink-0 px-4 sm:px-5 py-3 font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-800 ${
          isEmpty
            ? 'bg-blue-500/40 text-white/70 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        <PlusIcon />
      </button>
    </form>
  );
};

export default TodoForm;
