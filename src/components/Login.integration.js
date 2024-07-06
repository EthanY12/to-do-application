import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import authService from '../services/authServer';

jest.mock('../services/authServer');

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Login component correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('allows the user to login successfully', async () => {
    const mockUser = { id: 1, username: 'testuser', token: 'testtoken' };
    authService.login.mockResolvedValueOnce(mockUser);

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('testuser', 'password');
    });

    expect(screen.getByText(/login failed/i)).not.toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
  });

  test('shows an error message when login fails', async () => {
    const errorMessage = 'Invalid credentials';
    authService.login.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    });

    expect(screen.getByText(/login failed. please check your credentials./i)).toBeInTheDocument();
  });
});
