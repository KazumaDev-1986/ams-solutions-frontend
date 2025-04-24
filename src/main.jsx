import React from 'react';
import ReactDOM from 'react-dom/client';
import './presentation/styles/theme/variables.css';
import './presentation/styles/theme/reset.css';
import AppRouter from './presentation/routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
