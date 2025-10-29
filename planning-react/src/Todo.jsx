import React, { useState, useMemo, useRef, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  // Nâng cấp state: Mỗi todo là 1 object có id, text, done
  const [todos, setTodos] = useState([
    { id: 1, text: "Học React", done: true },
    { id: 2, text: "Học Tailwind CSS", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null); // 👈 Lưu ID đang sửa, không lưu index
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  // Shortcut: press '/' to focus the add input (like many apps)
  useEffect(() => {
    const onKey = (e) => {
      // ignore when user types into inputs or uses modifier keys
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // === CÁC HÀM CRUD (ĐÃ TỐI ƯU VỚI ID) ===

  // CREATE: Thêm ID duy nhất khi tạo
  const AddTodo = () => {
    // Validate input rỗng (Đã có)
    if (newTodo.trim() === "") {
      toast.warn("Bạn chưa nhập công việc!");
      return;
    }
    const newTodoItem = {
      id: Date.now(), // 👈 Dùng timestamp làm ID
      text: newTodo,
      done: false,
    };
    setTodos([newTodoItem, ...todos]); // Thêm vào đầu danh sách
    setNewTodo(""); // Clear input sau khi thêm (Đã có)
    toast.success("Đã thêm công việc!");
  };

  // UPDATE (Step 1): Kích hoạt chế độ sửa bằng ID
  const EditTodo = (id) => {
    setEditTodoId(id); // 👈 Lưu ID
    const todoToEdit = todos.find((t) => t.id === id); // Tìm todo bằng ID
    setEditText(todoToEdit.text);
  };

  // UPDATE (Step 2): Lưu lại nội dung đã sửa bằng ID
  const UpdateTodo = (id) => {
    // Validate input rỗng (Đã có)
    if (editText.trim() === "") {
      toast.warn("Nội dung không được rỗng!");
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditTodoId(null);
    setEditText("");
    toast.info("Cập nhật thành công!");
  };

  // DELETE: Xoá bằng ID
  const DeleteTodo = (id) => {
    // Xác nhận xoá (Đã có)
    if (window.confirm("Bạn có chắc muốn xoá công việc này không?")) {
      setTodos(todos.filter((todo) => todo.id !== id)); // 👈 Lọc ra bằng ID
      toast.error("Đã xoá công việc!");
    }
  };

  // TOGGLE: Tick hoàn thành bằng ID
  const ToggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Lọc (Filtering): Logic này vẫn đúng
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.done;
      if (filter === "completed") return todo.done;
      return true; // filter === 'all'
    });
  }, [todos, filter]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 transition-colors">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Quản lý công việc
        </h1>

        {/* Form nhập công việc (Không đổi) */}
  <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} onAdd={AddTodo} inputRef={inputRef} />

        {/* Bộ lọc công việc (Không đổi) */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 mb-4">
          {[ "all", "active", "completed" ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              {f === "all"
                ? "Tất cả"
                : f === "active"
                ? "Đang làm"
                : "Đã xong"}
            </button>
          ))}
        </div>

        {/* Danh sách công việc */}
        <TodoList
          todos={filteredTodos} // 👈 Truyền danh sách đã lọc
          editTodoId={editTodoId} // 👈 Đổi tên prop cho rõ nghĩa
          editText={editText}
          setEditText={setEditText}
          onEdit={EditTodo}
          onUpdate={UpdateTodo}
          onDelete={DeleteTodo}
          onToggle={ToggleDone}
        />
      </div>

      {/* Thông báo Toast (Đã có) */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="light"
        newestOnTop
      />
    </div>
  );
};

export default Todo;
