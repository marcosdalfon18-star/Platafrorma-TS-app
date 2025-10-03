import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  // The 'load' event is the standard and safest moment to register a service worker.
  // It ensures that the page's main content has finished loading and the service worker
  // registration won't compete for network resources, preventing delays in the user experience.
  // This also resolves the "InvalidStateError" by avoiding registration while the document is not fully active.
  window.addEventListener('load', () => {
    const swUrl = new URL('/service-worker.js', window.location.origin).href;
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}