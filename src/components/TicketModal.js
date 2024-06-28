import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TicketModal.css";

Modal.setAppElement("#root");

const TicketModal = ({
  isOpen,
  onRequestClose,
  onAddTicket,
  editingTicket,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setDate(editingTicket.date);
      setTime(editingTicket.time);
    } else {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
    }
  }, [editingTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not found");
      return;
    }
    const newTicket = {
      title,
      description,
      date,
      time,
      userId: user.id, // Add userId from localStorage
    };
    onAddTicket(newTicket);
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ticket-modal"
      overlayClassName="ticket-modal-overlay"
    >
      <h2>{editingTicket ? "Edit Ticket" : "Add New Ticket"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingTicket ? "Update Ticket" : "Add Ticket"}
        </button>
      </form>
    </Modal>
  );
};

export default TicketModal;
