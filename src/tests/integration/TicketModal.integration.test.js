import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketModal from '../../components/TicketModal'; 
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div'));

describe('TicketModal Component Integration Tests', () => {
  const mockOnAddTicket = jest.fn();
  const mockOnRequestClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <TicketModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onAddTicket={mockOnAddTicket}
        editingTicket={null}
      />
    );
  });

  test('renders TicketModal component correctly', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  test('calls onAddTicket with correct data', async () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Ticket' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: '2024-06-25' },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: '10:00' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /add ticket/i }));

    await waitFor(() => {
      expect(mockOnAddTicket).toHaveBeenCalledWith({
        title: 'Test Ticket',
        description: 'Test Description',
        date: '2024-06-25',
        time: '10:00',
      });
    });
  });

  test('calls onRequestClose when close button is clicked', () => {
    // Add a close button in the TicketModal component if not already present
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
