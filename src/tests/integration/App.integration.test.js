import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AppRouter from '../../../AppRouter'; // Adjust the path according to your project structure

describe('App Component Integration Tests', () => {
  test('redirects to login page if not logged in and tries to access tickets page', () => {
    render(<AppRouter />);

    window.history.pushState({}, 'Test page', '/tickets');

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('logs in and redirects to tickets page', async () => {
    render(<AppRouter />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.getByText(/ticket management system/i)).toBeInTheDocument();
    });
  });

  test('adds a ticket', async () => {
    render(<AppRouter />);

    // Log in first
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.getByText(/ticket management system/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/new ticket/i));
    fireEvent.change(screen.getByLabelText(/ticket title/i), { target: { value: 'New Ticket' } });
    fireEvent.click(screen.getByText(/add ticket/i));

    await waitFor(() => {
      expect(screen.getByText(/new ticket/i)).toBeInTheDocument();
    });
  });
});
