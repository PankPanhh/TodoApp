import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTodoContext } from '../context/TodoContext.jsx';
import { FaMoon, FaSun } from 'react-icons/fa';
import Toast from './Toast.jsx';
import DeleteModal from './DeleteModal.jsx';

const Layout = () => {
  const { theme, setTheme, toast, modal, hideDeleteModal, confirmDelete } = useTodoContext();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen font-sans bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">
      <header className="border-b border-gray-200/60 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive}) => `hover:underline ${isActive ? 'font-semibold text-blue-500' : ''}`}>Todo</NavLink>
            <NavLink to="/about" className={({isActive}) => `hover:underline ${isActive ? 'font-semibold text-blue-500' : ''}`}>About</NavLink>
          </nav>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? <FaSun /> : <FaMoon />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Toast message={toast.message} type={toast.type} show={toast.show} />
      <DeleteModal show={modal.show} onCancel={hideDeleteModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default Layout;
