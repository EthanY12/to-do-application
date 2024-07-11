import React from "react";
import Modal from "react-modal";

const TicketModal = ({
  isOpen,
  onRequestClose,
  onAddTicket,
  editingTicket,
}) => {
  const [title, setTitle] = React.useState(
    editingTicket ? editingTicket.title : "",
  );
  const [description, setDescription] = React.useState(
    editingTicket ? editingTicket.description : "",
  );
  const [date, setDate] = React.useState(
    editingTicket ? editingTicket.date : "",
  );
  const [time, setTime] = React.useState(
    editingTicket ? editingTicket.time : "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTicket({
      title,
      description,
      date,
      time,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ticket Modal"
    >
      <h2>{editingTicket ? "Edit Ticket" : "Add New Ticket"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingTicket ? "Update Ticket" : "Add Ticket"}
        </button>
        <button type="button" onClick={onRequestClose}>
          Close
        </button>
      </form>
    </Modal>
  );
};

export default TicketModal;
