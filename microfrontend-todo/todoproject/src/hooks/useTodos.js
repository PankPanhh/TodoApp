import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:3001/todos';
const THEME_KEY = 'theme';

export function useTodos() {
  // todos: [{ id, text, done }]
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter: 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all');

  // toast state (simple)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // modal state for delete confirm
  const [modal, setModal] = useState({ show: false, todoId: null });

  // theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  });

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch todos');
        const data = await res.json();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setToast({ show: true, message: 'Lỗi tải dữ liệu!', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // apply theme to html
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // auto hide toast
  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast((s) => ({ ...s, show: false })), 2500);
      return () => clearTimeout(t);
    }
  }, [toast.show]);

  // CRUD operations (async)
  const addTodo = async (text) => {
    const value = text.trim();
    if (!value) {
      setToast({ show: true, message: 'Vui lòng nhập tên công việc!', type: 'error' });
      return;
    }
    const newTodo = { id: Date.now(), text: value, done: false };
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Failed to add todo');
      const created = await res.json();
      setTodos((prev) => [created, ...prev]);
      setToast({ show: true, message: 'Đã thêm công việc mới!', type: 'success' });
    } catch (err) {
      setToast({ show: true, message: 'Lỗi thêm công việc!', type: 'error' });
    }
  };

  const updateTodo = async (id, text) => {
    const value = text.trim();
    if (!value) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: value } : t)));
    } catch (err) {
      setToast({ show: true, message: 'Lỗi cập nhật!', type: 'error' });
    }
  };

  const toggleDone = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !todo.done }),
      });
      if (!res.ok) throw new Error('Failed to toggle done');
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    } catch (err) {
      setToast({ show: true, message: 'Lỗi chuyển trạng thái!', type: 'error' });
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete todo');
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setToast({ show: true, message: 'Lỗi xoá!', type: 'error' });
    }
  };

  // modal helpers
  const showDeleteModal = (id) => setModal({ show: true, todoId: id });
  const hideDeleteModal = () => setModal({ show: false, todoId: null });
  const confirmDelete = () => {
    if (modal.todoId) {
      deleteTodo(modal.todoId);
      hideDeleteModal();
      setToast({ show: true, message: 'Đã xoá công việc.', type: 'success' });
    }
  };

  // filters
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
    loading,
    error,
    // modal & toast & theme
    modal,
    showDeleteModal,
    hideDeleteModal,
    confirmDelete,
    toast,
    setToast,
    theme,
    setTheme,
  };
}
