import React, { useState } from 'react';
import { TrashIcon, CheckIcon } from './Icons.jsx';

/**
 * Hiển thị một công việc.
 * @param {object} props
 * @param {object} props.todo - Object công việc { id, text, completed }
 * @param {function(number): void} props.toggleComplete - Hàm để thay đổi trạng thái completed.
 * @param {function(number): void} props.showDeleteModal - Hàm để hiển thị modal xác nhận xoá.
 */
const TodoItem = ({ todo, toggleComplete, showDeleteModal, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const submitEdit = () => {
    const value = text.trim();
    if (value && value !== todo.text) onUpdate?.(todo.id, value);
    setEditing(false);
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-200 bg-white hover:bg-gray-50 dark:bg-gray-700/90 dark:hover:bg-gray-700 ${
        todo.done ? 'opacity-70' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Custom checkbox using peer */}
        <label className="relative inline-flex items-center">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleComplete(todo.id)}
            className="peer sr-only"
            aria-label="Đánh dấu hoàn thành"
          />
          <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 ${
            todo.done ? 'bg-green-500 border-green-500' : 'border-gray-400 group-hover:border-green-400'
          }`}
          >{todo.done && <CheckIcon />}</span>
        </label>

        {editing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={(e) => e.key === 'Enter' && submitEdit()}
            className="flex-grow bg-white text-gray-900 border border-gray-300 rounded-md px-2 py-1 dark:bg-transparent dark:text-white dark:border-gray-600"
          />
        ) : (
          <button
            onDoubleClick={() => setEditing(true)}
            onClick={() => toggleComplete(todo.id)}
            className={`text-left truncate cursor-pointer text-[15px] sm:text-lg transition-all duration-200 ${
              todo.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
            }`}
            title="Chuyển trạng thái hoàn thành"
          >
            {todo.text}
          </button>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
        <button
          onClick={() => setEditing((v) => !v)}
          className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          {editing ? 'Lưu' : 'Sửa'}
        </button>
        <button
          onClick={() => showDeleteModal(todo.id)}
          className="p-1.5 text-gray-500 hover:text-red-500 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-white dark:text-gray-300 dark:focus-visible:ring-offset-gray-800"
          aria-label="Xoá công việc"
          title="Xoá công việc"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

