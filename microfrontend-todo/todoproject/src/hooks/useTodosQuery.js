import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:3001/todos';
const THEME_KEY = 'theme';

// API functions
const fetchTodos = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

const createTodo = async (newTodo) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
};

const patchTodo = async ({ id, updates }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};

const removeTodo = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
};

export function useTodos() {
  const queryClient = useQueryClient();

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

  // Query: fetch todos
  const { data: todos = [], isLoading: loading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Mutation: add todo
  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setToast({ show: true, message: 'Đã thêm công việc mới!', type: 'success' });
    },
    onError: () => {
      setToast({ show: true, message: 'Lỗi thêm công việc!', type: 'error' });
    },
  });

  // Mutation: update todo
  const updateMutation = useMutation({
    mutationFn: patchTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: () => {
      setToast({ show: true, message: 'Lỗi cập nhật!', type: 'error' });
    },
  });

  // Mutation: delete todo
  const deleteMutation = useMutation({
    mutationFn: removeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: () => {
      setToast({ show: true, message: 'Lỗi xoá!', type: 'error' });
    },
  });

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

  // CRUD operations
  const addTodo = (text) => {
    const value = text.trim();
    if (!value) {
      setToast({ show: true, message: 'Vui lòng nhập tên công việc!', type: 'error' });
      return;
    }
    // Don't send id - let json-server auto-generate it
    const newTodo = { text: value, done: false };
    addMutation.mutate(newTodo);
  };

  const updateTodo = (id, text) => {
    const value = text.trim();
    if (!value) return;
    updateMutation.mutate({ id, updates: { text: value } });
  };

  const toggleDone = (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    updateMutation.mutate({ id, updates: { done: !todo.done } });
  };

  const deleteTodo = (id) => {
    deleteMutation.mutate(id);
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
    error: error?.message,
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
