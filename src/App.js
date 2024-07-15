import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Modal from "react-modal";
import TicketModal from "./components/TicketModal";
import TicketList from "./components/TicketList";
import Login from "./components/Login";
import Register from "./components/Register";
import authService from "./services/authServer";
import ticketService from "./services/ticketService";
import "./App.css";

// Set the app element for react-modal
Modal.setAppElement("#root");

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await ticketService.getTickets();
        console.log("Fetched tickets:", tickets); // Log fetched tickets
        setTickets(Array.isArray(tickets) ? tickets : []); // Ensure this is an array
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      }
    };

    if (currentUser) {
      fetchTickets();
    }
  }, [currentUser]);

  const handleAddTicket = async (ticket) => {
    try {
      console.log("Adding ticket:", ticket); // Log the ticket data
      const newTicket = await ticketService.createTicket(ticket);
      console.log("Ticket added:", newTicket); // Log the added ticket response
      setTickets((prevTickets) =>
        Array.isArray(prevTickets) ? [...prevTickets, newTicket] : [newTicket],
      ); // Ensure prevTickets is an array
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add ticket", error);
      console.error("Error response:", error.response); // Log error response from server
    }
  };

  const handleDeleteTicket = async (id) => {
    try {
      await ticketService.deleteTicket(id);
      setTickets((prevTickets) =>
        Array.isArray(prevTickets)
          ? prevTickets.filter((ticket) => ticket.id !== id)
          : [],
      ); // Ensure prevTickets is an array
    } catch (error) {
      console.error("Failed to delete ticket", error);
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleToggleComplete = async (id) => {
    try {
      const ticketToToggle = tickets.find((ticket) => ticket.id === id);
      const updatedTicket = {
        ...ticketToToggle,
        completed: !ticketToToggle.completed,
      };
      await ticketService.updateTicket(id, updatedTicket);
      setTickets((prevTickets) =>
        Array.isArray(prevTickets)
          ? prevTickets.map((ticket) =>
              ticket.id === id ? updatedTicket : ticket,
            )
          : [],
      );
    } catch (error) {
      console.error("Failed to toggle ticket completion", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tickets"
            element={
              currentUser ? (
                <>
                  <h1>Ticket Management System</h1>
                  <button onClick={() => setIsModalOpen(true)}>
                    New Ticket
                  </button>
                  <TicketList
                    tickets={tickets}
                    onEdit={handleEditTicket}
                    onDelete={handleDeleteTicket}
                    onToggleComplete={handleToggleComplete}
                  />
                  <TicketModal
                    isOpen={isModalOpen}
                    onRequestClose={() => {
                      setIsModalOpen(false);
                      setEditingTicket(null);
                    }}
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
