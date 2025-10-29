import React from 'react';
import TodoItem from './TodoItem.jsx';
import { EmptyIcon, PlusIcon } from './Icons.jsx';

/**
 * Hiển thị danh sách các công việc.
 * @param {object} props
 * @param {Array<object>} props.todos - Mảng các công việc.
 * @param {function(number): void} props.toggleComplete - Hàm để thay đổi trạng thái completed.
 * @param {function(number): void} props.showDeleteModal - Hàm để hiển thị modal xác nhận xoá.
 */
const TodoList = ({ todos, toggleComplete, showDeleteModal, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-xl border border-dashed border-gray-300 p-8 bg-gray-50 dark:bg-gray-700/40 dark:border-gray-600">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-600/60 dark:text-gray-200">
              <EmptyIcon />
            </div>
            <p className="text-lg font-medium">Tuyệt vời! Không có công việc nào.</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Hãy thêm công việc mới để bắt đầu nhé.</p>
            <div className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400/90">
              <PlusIcon />
              <span>Nhập nội dung ở ô phía trên rồi nhấn nút thêm</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3 divide-y divide-gray-200 dark:divide-gray-700/50">
      {todos.map((todo) => (
        <li key={todo.id} className="pt-3 first:pt-0">
          <TodoItem
            todo={todo}
            toggleComplete={toggleComplete}
            showDeleteModal={showDeleteModal}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

