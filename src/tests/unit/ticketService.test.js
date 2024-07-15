import axios from "axios";
import ticketService from "../../services/ticketService";

jest.mock("axios");

describe("ticketService", () => {
  describe("getTickets", () => {
    it("should fetch all tickets", async () => {
      const mockTickets = [
        { id: 1, title: "Test Ticket 1", description: "Test Description 1" },
        { id: 2, title: "Test Ticket 2", description: "Test Description 2" },
      ];
      axios.get.mockResolvedValueOnce({ data: mockTickets });

      const result = await ticketService.getTickets();

      expect(result).toEqual(mockTickets); // Directly compare the result
    });
  });

  describe("createTicket", () => {
    it("should create a new ticket", async () => {
      const newTicket = { title: "New Ticket", description: "New Description" };
      const mockResponse = { ...newTicket, id: 3 };
      axios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await ticketService.createTicket(newTicket);

      expect(result).toEqual(mockResponse); // Directly compare the result
    });
  });

  describe("updateTicket", () => {
    it("should update an existing ticket", async () => {
      const updatedTicket = {
        title: "Updated Ticket",
        description: "Updated Description",
      };
      axios.put.mockResolvedValueOnce({ data: updatedTicket });

      const result = await ticketService.updateTicket(1, updatedTicket);

      expect(result).toEqual(updatedTicket); // Directly compare the result
    });
  });

  describe("deleteTicket", () => {
    it("should delete a ticket", async () => {
      axios.delete.mockResolvedValueOnce({ status: 200 });

      const result = await ticketService.deleteTicket(1);

      expect(result).toBeUndefined(); // Check that the result is undefined as delete doesn't return data
    });
  });
});
