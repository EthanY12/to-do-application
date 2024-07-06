import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketModal from './TicketModal';

describe('TicketModal Component Unit Tests', () => {
  const mockOnAddTicket = jest.fn();
  const mockOnRequestClose = jest.fn();

  beforeEach(() => {
    render(
      <TicketModal
        isOpen={true}
        onAddTicket={mockOnAddTicket}
        onRequestClose={mockOnRequestClose}
      />
    );
  });

  test('renders TicketModal component correctly', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add ticket/i })).toBeInTheDocument();
  });

  test('calls onAddTicket with correct data', () => {
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Ticket' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-07-04' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '10:00' } });
    fireEvent.click(screen.getByRole('button', { name: /add ticket/i }));

    expect(mockOnAddTicket).toHaveBeenCalledWith({
      title: 'Test Ticket',
      description: 'Test Description',
      date: '2024-07-04',
      time: '10:00'
    });
  });

  test('calls onRequestClose when close button is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
