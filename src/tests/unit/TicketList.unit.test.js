import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TicketList from "../../components/TicketList";
import ticketService from "../../services/ticketService";

jest.mock("../../services/ticketService");

const tickets = [
  {
    id: 1,
    title: "Test Ticket 1",
    description: "Test Description 1",
    date: "2024-07-04",
    time: "10:00",
    completed: false,
  },
  {
    id: 2,
    title: "Test Ticket 2",
    description: "Test Description 2",
    date: "2024-07-05",
    time: "11:00",
    completed: true,
  },
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnToggleComplete = jest.fn();

describe("TicketList Component Unit Tests", () => {
  beforeEach(() => {
    ticketService.getTickets.mockResolvedValue({ data: tickets });
    ticketService.deleteTicket.mockResolvedValue({});
  });

  test("renders TicketList component correctly", async () => {
    render(
      <TicketList
        tickets={tickets}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />,
    );

    await screen.findByText(/test ticket 1/i);

    expect(screen.getByText(/test ticket 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test ticket 2/i)).toBeInTheDocument();
    expect(screen.getByText(/test description 2/i)).toBeInTheDocument();
  });

  test("calls deleteTicket service on delete button click", async () => {
    render(
      <TicketList
        tickets={tickets}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />,
    );

    await screen.findByText(/test ticket 1/i);

    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test("shows edit modal on edit button click", async () => {
    render(
      <TicketList
        tickets={tickets}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />,
    );

    await screen.findByText(/test ticket 1/i);

    fireEvent.click(screen.getAllByText(/edit/i)[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(tickets[0]);
  });

  test("toggles complete state on done button click", async () => {
    render(
      <TicketList
        tickets={tickets}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
      />,
    );

    await screen.findByText(/test ticket 1/i);

    fireEvent.click(screen.getAllByText(/done/i)[0]);

    expect(mockOnToggleComplete).toHaveBeenCalledWith(1);
  });
});
