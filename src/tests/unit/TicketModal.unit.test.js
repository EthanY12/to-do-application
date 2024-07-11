import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TicketModal from "../../components/TicketModal"; // Adjust the path as necessary
import Modal from "react-modal";

Modal.setAppElement(document.createElement("div"));

describe("TicketModal Component Unit Tests", () => {
  const mockOnAddTicket = jest.fn();
  const mockOnRequestClose = jest.fn();

  beforeEach(() => {
    mockOnAddTicket.mockClear();
    mockOnRequestClose.mockClear();

    render(
      <TicketModal
        isOpen={true}
        onRequestClose={mockOnRequestClose}
        onAddTicket={mockOnAddTicket}
        editingTicket={null}
      />,
    );
  });

  test("renders TicketModal component correctly", () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
  });

  test("calls onAddTicket with correct data", () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Ticket" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-06-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "10:00" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /add ticket/i }));

    expect(mockOnAddTicket).toHaveBeenCalledWith({
      title: "Test Ticket",
      description: "Test Description",
      date: "2024-06-25",
      time: "10:00",
      userId: 1, // Ensure userId is a number
    });
  });

  test("calls onRequestClose when close button is clicked", () => {
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(mockOnRequestClose).toHaveBeenCalled();
  });
});
