import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicketModal from '../../components/TicketModal';

describe('TicketModal Component Unit Tests', () => {
  const mockOnAddTicket = jest.fn();
  const mockOnRequestClose = jest.fn();

  beforeEach(() => {
    mockOnAddTicket.mockClear();
    mockOnRequestClose.mockClear();
  });

  it('calls onAddTicket with correct data', () => {
    render(
      <TicketModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onAddTicket={mockOnAddTicket}
      />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Ticket' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-06-25' }
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: '10:00' }
    });

    fireEvent.submit(screen.getByRole('button', { name: /add ticket/i }));

    expect(mockOnAddTicket).toHaveBeenCalledWith({
      title: 'Test Ticket',
      description: 'Test Description',
      date: '2024-06-25',
      time: '10:00'
    });
  });
});
