import axios from "axios";

const API_URL = "http://localhost:5000/tickets";

const getTickets = async () => {
  const response = await axios.get(API_URL);
  console.log("API response for getTickets:", response.data); // Log the response data
  return response.data; // Ensure this returns the tickets data
};

const createTicket = async (ticket) => {
  const response = await axios.post(API_URL, ticket);
  console.log("API response for createTicket:", response.data); // Log the response data
  return response.data; // Ensure this returns the created ticket data
};

const updateTicket = async (id, ticket) => {
  const response = await axios.put(`${API_URL}/${id}`, ticket);
  return response.data;
};

const deleteTicket = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
