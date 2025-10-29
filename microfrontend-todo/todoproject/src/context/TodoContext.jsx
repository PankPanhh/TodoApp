import React, { createContext, useContext } from 'react';
import { useTodos } from '../hooks/useTodosQuery.js';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const value = useTodos();
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
};
