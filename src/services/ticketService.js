import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getTickets = () => {
  return axios.get(`${API_URL}/tickets`);
};

const createTicket = (ticket) => {
  return axios.post(`${API_URL}/tickets`, ticket);
};

const updateTicket = (id, ticket) => {
  return axios.put(`${API_URL}/tickets/${id}`, ticket);
};

const deleteTicket = (id) => {
  return axios.delete(`${API_URL}/tickets/${id}`);
};

export default {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket
};
