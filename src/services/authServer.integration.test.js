import axios from "axios";
import authService from "./authServer";
import ticketService from "./ticketService";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("authService and ticketService Integration Tests", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should register, login, and fetch tickets for a user", async () => {
    const mockUser = { id: 1, username: "testuser", token: "testtoken" };
    const mockTickets = [
      {
        id: 1,
        title: "Test Ticket 1",
        description: "Test Description 1",
        userId: 1,
      },
    ];

    mock
      .onPost("http://localhost:5000/register")
      .reply(200, { message: "User registered" });
    mock.onPost("http://localhost:5000/login").reply(200, mockUser);
    mock.onGet("http://localhost:5000/tickets").reply(200, mockTickets);

    // Register user
    const registerResult = await authService.register("testuser", "password");
    expect(registerResult.data.message).toEqual("User registered");

    // Login user
    const loginResult = await authService.login("testuser", "password");
    expect(loginResult).toEqual(mockUser);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(mockUser),
    );

    // Fetch tickets
    const ticketsResult = await ticketService.getTickets();
    expect(ticketsResult.data).toEqual(mockTickets);
  });

  it("should create, update, and delete a ticket for a user", async () => {
    const newTicket = { title: "New Ticket", description: "New Description" };
    const createdTicket = { ...newTicket, id: 1 };
    const updatedTicket = { ...newTicket, title: "Updated Ticket" };

    mock.onPost("http://localhost:5000/tickets").reply(200, createdTicket);
    mock.onPut("http://localhost:5000/tickets/1").reply(200, updatedTicket);
    mock.onDelete("http://localhost:5000/tickets/1").reply(200);

    // Create ticket
    const createResult = await ticketService.createTicket(newTicket);
    expect(createResult.data).toEqual(createdTicket);

    // Update ticket
    const updateResult = await ticketService.updateTicket(1, updatedTicket);
    expect(updateResult.data).toEqual(updatedTicket);

    // Delete ticket
    const deleteResult = await ticketService.deleteTicket(1);
    expect(deleteResult.status).toBe(200);
  });
});
