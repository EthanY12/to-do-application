import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TicketList from "./TicketList";
import authService from "../services/authServer";
import ticketService from "../services/ticketService";

jest.mock("../services/authServer");
jest.mock("../services/ticketService");

const tickets = [
  {
    id: 1,
    title: "Test Ticket 1",
    description: "Test Description 1",
    date: "2024-07-04",
    time: "10:00",
  },
  {
    id: 2,
    title: "Test Ticket 2",
    description: "Test Description 2",
    date: "2024-07-05",
    time: "11:00",
  },
];

describe("TicketList Component Integration Tests", () => {
  beforeEach(() => {
    authService.getCurrentUser.mockReturnValue({ id: 1, username: "testuser" });
    ticketService.getTickets.mockResolvedValue({ data: tickets });
  });

  test("fetches and displays tickets on load", async () => {
    render(
      <Router>
        <TicketList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText(/test ticket 1/i)).toBeInTheDocument();
      expect(screen.getByText(/test description 1/i)).toBeInTheDocument();
      expect(screen.getByText(/test ticket 2/i)).toBeInTheDocument();
      expect(screen.getByText(/test description 2/i)).toBeInTheDocument();
    });
  });

  test("deletes a ticket successfully", async () => {
    ticketService.deleteTicket.mockResolvedValue({});

    render(
      <Router>
        <TicketList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText(/test ticket 1/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/delete/i)[0]);

    await waitFor(() => {
      expect(ticketService.deleteTicket).toHaveBeenCalledWith(1);
      expect(screen.queryByText(/test ticket 1/i)).not.toBeInTheDocument();
    });
  });

  test("opens edit modal on edit button click", async () => {
    render(
      <Router>
        <TicketList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText(/test ticket 1/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText(/edit/i)[0]);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });
});
