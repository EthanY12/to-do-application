import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TicketModal from './components/TicketModal';
import TicketList from './components/TicketList';
import Login from './components/Login';
import Register from './components/Register';
import authService from './services/authServer';
import ticketService from './services/ticketService';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketService.getTickets();
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
    };

    if (currentUser) {
      fetchTickets();
    }
  }, [currentUser]);

  const handleAddTicket = async (ticket) => {
    try {
      if (editingTicket) {
        const response = await ticketService.updateTicket(editingTicket.id, ticket);
        setTickets(tickets.map(t => (t.id === editingTicket.id ? response.data : t)));
        setEditingTicket(null);
      } else {
        const response = await ticketService.createTicket(ticket);
        setTickets([...tickets, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add ticket', error);
    }
  };

  const handleDeleteTicket = async (id) => {
    try {
      await ticketService.deleteTicket(id);
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Failed to delete ticket', error);
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Navigate to="/tickets" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login onLogin={setCurrentUser} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/tickets"
            element={
              currentUser ? (
                <>
                  <h1>Ticket Management System</h1>
                  <button onClick={() => setIsModalOpen(true)}>New Ticket</button>
                  <TicketList tickets={tickets} onEdit={handleEditTicket} onDelete={handleDeleteTicket} />
                  <TicketModal
                    isOpen={isModalOpen}
                    onRequestClose={() => { setIsModalOpen(false); setEditingTicket(null); }}
                    onAddTicket={handleAddTicket}
                    editingTicket={editingTicket}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
