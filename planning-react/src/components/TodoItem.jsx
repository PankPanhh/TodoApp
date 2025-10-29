import React from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const TodoItem = ({
  todo,
  editTodoId,
  editText,
  setEditText,
  onEdit,
  onUpdate,
  onDelete,
  onToggle,
}) => {
  const isEditing = editTodoId === todo.id;
  // support both `done` and `completed` field names
  const done = todo.completed ?? todo.done;

  const handleUpdateOnEnter = (e) => {
    if (e.key === 'Enter') onUpdate(todo.id);
  };

  return (
  <li className="group flex items-center justify-between px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md animate-fade-in-up">
      {isEditing ? (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleUpdateOnEnter}
            autoFocus
            onBlur={() => onUpdate(todo.id)}
            className="flex-grow px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={() => onUpdate(todo.id)}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-md"
            aria-label="Save"
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 min-w-0">

            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={!!done}
              onChange={() => onToggle(todo.id)}
              className="peer sr-checkbox"
            />

            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-150 cursor-pointer ${
                done ? 'bg-sky-500 border-sky-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <FaCheck className={`text-white text-xs ${done ? 'opacity-100' : 'opacity-0'}`} />
            </label>

            <div className="flex flex-col min-w-0">
              <button
                onClick={() => onEdit(todo.id)}
                className={`text-left min-w-0 break-words text-lg ${
                  done ? 'line-through text-gray-400 dark:text-gray-500 animate-strike' : 'text-gray-800 dark:text-gray-100'
                }`}
              >
                {todo.text}
              </button>
              {todo.notes ? <span className="text-sm text-gray-500 dark:text-gray-400">{todo.notes}</span> : null}
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-gray-700"
              aria-label="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;

