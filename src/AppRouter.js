import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';

const AppRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRouter;
