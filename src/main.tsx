import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import { DashboardProvider } from './providers/Dashboard';
import { RouterProvider } from './providers/Router';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </RouterProvider>
  </React.StrictMode>,
);
