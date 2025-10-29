import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editTodoId, // 👈 Đã đổi tên
  editText,
  setEditText,
  onEdit,
  onUpdate,
  onDelete,
  onToggle,
}) => {
  if (todos.length === 0)
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 italic mt-6 p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        🎉 Không có công việc nào.
      </p>
    );

  // Thống kê
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-3 px-1">
        <span className="font-medium">
          Còn lại: <span className="text-blue-600 dark:text-blue-400 font-bold">{total - completed}</span>
        </span>
        <span className="font-medium">
          Hoàn thành: <span className="text-green-600 dark:text-green-400 font-bold">{completed}</span>
        </span>
      </div>

      {/* Dùng divide-y để tạo đường kẻ ngăn cách */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id} // 👈 DÙNG ID LÀM KEY, KHÔNG DÙNG INDEX
            todo={todo}
            editTodoId={editTodoId}
            editText={editText}
            setEditText={setEditText}
            onEdit={onEdit}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
