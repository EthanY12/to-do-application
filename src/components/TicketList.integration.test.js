import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TicketList from "./TicketList";
import authService from "../services/authServer";

jest.mock("../services/authServer");

describe("TicketList Component Integration Tests", () => {
  beforeEach(() => {
    authService.getTickets.mockResolvedValue([
      {
        id: 1,
        title: "Test Ticket 1",
        description: "Description 1",
        date: "2023-07-01",
        time: "10:00",
      },
      {
        id: 2,
        title: "Test Ticket 2",
        description: "Description 2",
        date: "2023-07-02",
        time: "11:00",
      },
    ]);
  });

  test("fetches and displays tickets on load", async () => {
    render(
      <Router>
        <TicketList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test Ticket 1")).toBeInTheDocument();
      expect(screen.getByText("Test Ticket 2")).toBeInTheDocument();
    });
  });

  test("deletes a ticket successfully", async () => {
    authService.deleteTicket.mockResolvedValueOnce({});

    render(
      <Router>
        <TicketList />
      </Router>,
    );

    fireEvent.click(screen.getByText("Delete", { selector: "button" }));

    await waitFor(() => {
      expect(screen.queryByText("Test Ticket 1")).not.toBeInTheDocument();
    });
  });

  test("opens edit modal on edit button click", async () => {
    render(
      <Router>
        <TicketList />
      </Router>,
    );

    fireEvent.click(screen.getByText("Edit", { selector: "button" }));

    await waitFor(() => {
      expect(screen.getByText("Edit Ticket")).toBeInTheDocument();
    });
  });
});
