import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TicketModal from './TicketModal';
import ticketService from '../services/ticketService';

jest.mock('../services/ticketService');

describe('TicketModal Component Integration Tests', () => {
  test('creates a new ticket successfully', async () => {
    ticketService.createTicket.mockResolvedValue({
      id: 1,
      title: 'Test Ticket',
      description: 'Test Description',
      date: '2023-07-01',
      time: '10:00'
    });

    render(
      <Router>
        <TicketModal isOpen={true} onRequestClose={jest.fn()} onAddTicket={jest.fn()} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Ticket' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-07-01' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '10:00' } });
    fireEvent.click(screen.getByText(/add ticket/i));

    await waitFor(() => {
      expect(ticketService.createTicket).toHaveBeenCalledWith({
        title: 'Test Ticket',
        description: 'Test Description',
        date: '2023-07-01',
        time: '10:00'
      });
    });
  });
});
