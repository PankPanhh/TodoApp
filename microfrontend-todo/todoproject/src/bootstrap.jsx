import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Bootstrap pattern for microfrontend
const mount = (el) => {
  const root = ReactDOM.createRoot(el);
  root.render(<App />);
  return root;
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development' && !window.__CONTAINER__) {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

// Expose the mount function for the container app
export { mount };
export default App;