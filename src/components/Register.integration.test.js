import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import authService from '../services/authServer';

jest.mock('../services/authServer');

describe('Register Component Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('navigates to login on successful registration', async () => {
    authService.register.mockResolvedValue({ message: 'User registered' });

    render(
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith('testuser', 'password');
    });

    expect(screen.queryByLabelText(/username/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('stays on register page on failed registration', async () => {
    authService.register.mockRejectedValue({ response: { data: { message: 'Registration failed' } } });

    render(
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith('testuser', 'password');
    });

    expect(screen.queryByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
  });
});
