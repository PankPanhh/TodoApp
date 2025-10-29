import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout.jsx';
import TodoPage from './pages/TodoPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { TodoProvider } from './context/TodoContext.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5000,
    },
  },
});

// --- App Component (Main) ---
/**
 * Component chính của ứng dụng, quản lý state.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TodoProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<TodoPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </TodoProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

