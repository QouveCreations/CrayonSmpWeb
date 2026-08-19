import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Suppress known Three.js / React Three Fiber warnings that clutter the console
// during development (StrictMode unmounts) or when navigating between pages.
const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = args.join(' ');
  if (msg.includes('THREE.Clock:') || msg.includes('WebGL context was lost')) {
    return;
  }
  originalWarn(...args);
};

const originalError = console.error;
console.error = (...args) => {
  const msg = args.join(' ');
  if (msg.includes('Context Lost') || msg.includes('WebGL context was lost')) {
    return;
  }
  originalError(...args);
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
