import Todo from "./Todo.jsx";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './hooks/useTheme.js';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-4">
        {/* Dark Mode Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
        
        <Todo />
      </div>
    </div>
  );
}
