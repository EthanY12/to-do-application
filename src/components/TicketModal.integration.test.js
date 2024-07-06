import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TicketModal from './TicketModal';
import ticketService from '../services/ticketService';

jest.mock('../services/ticketService');

describe('TicketModal Component Integration Tests', () => {
  const mockOnAddTicket = jest.fn();
  const mockOnRequestClose = jest.fn();

  beforeEach(() => {
    ticketService.createTicket.mockResolvedValue({
      data: {
        id: 1,
        title: 'Test Ticket',
        description: 'Test Description',
        date: '2024-07-04',
        time: '10:00'
      }
    });

    render(
      <Router>
        <TicketModal
          isOpen={true}
          onAddTicket={mockOnAddTicket}
          onRequestClose={mockOnRequestClose}
        />
      </Router>
    );
  });

  test('creates a new ticket successfully', async () => {
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Ticket' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-07-04' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '10:00' } });
    fireEvent.click(screen.getByRole('button', { name: /add ticket/i }));

    expect(ticketService.createTicket).toHaveBeenCalledWith({
      title: 'Test Ticket',
      description: 'Test Description',
      date: '2024-07-04',
      time: '10:00'
    });

    expect(mockOnAddTicket).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Ticket',
      description: 'Test Description',
      date: '2024-07-04',
      time: '10:00'
    });
  });

  test('closes modal on close button click', () => {
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
