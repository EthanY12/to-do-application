import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketList from './TicketList';
import ticketService from '../services/ticketService';

jest.mock('../services/ticketService');

const tickets = [
  { id: 1, title: 'Test Ticket 1', description: 'Test Description 1', date: '2024-07-04', time: '10:00' },
  { id: 2, title: 'Test Ticket 2', description: 'Test Description 2', date: '2024-07-05', time: '11:00' }
];

describe('TicketList Component Unit Tests', () => {
  beforeEach(() => {
    ticketService.getTickets.mockResolvedValue({ data: tickets });
  });

  test('renders TicketList component correctly', async () => {
    render(<TicketList />);

    await screen.findByText(/test ticket 1/i);

    expect(screen.getByText(/test ticket 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test ticket 2/i)).toBeInTheDocument();
    expect(screen.getByText(/test description 2/i)).toBeInTheDocument();
  });

  test('calls deleteTicket service on delete button click', async () => {
    ticketService.deleteTicket.mockResolvedValue({});

    render(<TicketList />);

    await screen.findByText(/test ticket 1/i);

    fireEvent.click(screen.getByText(/delete/i));

    await screen.findByText(/test ticket 2/i);

    expect(ticketService.deleteTicket).toHaveBeenCalledWith(1);
  });

  test('shows edit modal on edit button click', async () => {
    render(<TicketList />);

    await screen.findByText(/test ticket 1/i);

    fireEvent.click(screen.getByText(/edit/i));

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });
});
