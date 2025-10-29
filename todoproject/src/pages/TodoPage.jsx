import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTodoContext } from '../context/TodoContext.jsx';
import TodoForm from '../components/TodoForm.jsx';
import TodoItem from '../components/TodoItem.jsx';

const TodoPage = () => {
  const { filteredTodos, addTodo, toggleDone, showDeleteModal, filter, setFilter, updateTodo, loading, error } = useTodoContext();

  if (loading) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 text-center">
        <p className="text-red-600 dark:text-red-400">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-500">Todo List</h1>
      </header>

      <TodoForm addTodo={addTodo} />

      {/* Filter controls */}
      <div className="mt-2 mb-4 flex items-center gap-2 text-sm">
        {['all','active','completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md border transition-colors ${filter===f ? 'bg-blue-600 text-white border-transparent' : 'bg-transparent border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {f[0].toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-gray-200/20 dark:divide-gray-700/50">
        <AnimatePresence initial={false}>
          {filteredTodos.map((todo) => (
            <motion.li key={todo.id} layout initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
              <TodoItem todo={todo} toggleComplete={toggleDone} showDeleteModal={showDeleteModal} onUpdate={updateTodo} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default TodoPage;
