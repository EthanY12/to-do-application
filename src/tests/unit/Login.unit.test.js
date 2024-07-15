import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Login from '../../components/Login';
import authService from '../../services/authServer';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('../../services/authServer');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component Unit Tests', () => {
  const mockOnLogin = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    authService.login.mockClear();
    mockOnLogin.mockClear();
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('calls login function on form submit with correct data', async () => {
    authService.login.mockResolvedValueOnce({ id: 1, username: 'testuser' });

    await act(async () => {
      render(
        <Router>
          <Login onLogin={mockOnLogin} />
        </Router>
      );
    });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password'
      });
    });

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({ id: 1, username: 'testuser' });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/tickets');
    });
  });

  it('shows error message on failed login', async () => {
    authService.login.mockRejectedValueOnce({
      response: { data: { message: 'Login failed' } }
    });

    await act(async () => {
      render(
        <Router>
          <Login onLogin={mockOnLogin} />
        </Router>
      );
    });

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});
