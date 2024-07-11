import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketList from '../../components/TicketList'; // Adjust the path as necessary
import { BrowserRouter as Router } from 'react-router-dom';

describe('TicketList Component Integration Tests', () => {
  const mockTickets = [
    { id: 1, title: 'Test Ticket 1', description: 'Test Description 1', date: '2024-07-04', time: '10:00', completed: false },
    { id: 2, title: 'Test Ticket 2', description: 'Test Description 2', date: '2024-07-05', time: '11:00', completed: false },
  ];
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnToggleComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches and displays tickets on load', async () => {
    render(
      <Router>
        <TicketList tickets={mockTickets} onEdit={mockOnEdit} onDelete={mockOnDelete} onToggleComplete={mockOnToggleComplete} />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Ticket 1')).toBeInTheDocument();
      expect(screen.getByText('Test Ticket 2')).toBeInTheDocument();
    });
  });

  test('deletes a ticket successfully', async () => {
    render(
      <Router>
        <TicketList tickets={mockTickets} onEdit={mockOnEdit} onDelete={mockOnDelete} onToggleComplete={mockOnToggleComplete} />
      </Router>
    );

    await waitFor(() => screen.getByText('Test Ticket 1'));

    const deleteButtons = screen.getAllByText('Delete', { selector: 'button' });
    fireEvent.click(deleteButtons[0]); // Assuming you want to delete the first ticket

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });

  test('opens edit modal on edit button click', async () => {
    render(
      <Router>
        <TicketList tickets={mockTickets} onEdit={mockOnEdit} onDelete={mockOnDelete} onToggleComplete={mockOnToggleComplete} />
      </Router>
    );

    await waitFor(() => screen.getByText('Test Ticket 1'));

    const editButtons = screen.getAllByText('Edit', { selector: 'button' });
    fireEvent.click(editButtons[0]); // Assuming you want to edit the first ticket

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(mockTickets[0]);
    });
  });
});
