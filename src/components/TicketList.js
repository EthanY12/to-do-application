import React from "react";

const TicketList = ({ tickets = [], onEdit, onDelete, onToggleComplete }) => {
  // Filter out any undefined or malformed tickets
  const validTickets = tickets.filter(
    (ticket) =>
      ticket &&
      ticket.date &&
      ticket.time &&
      ticket.title &&
      ticket.description,
  );

  // Sort tickets by date and then by time
  const sortedTickets = validTickets.sort((a, b) => {
    const dateComparison = new Date(a.date) - new Date(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.time.localeCompare(b.time);
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const date = ticket.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(ticket);
    return acc;
  }, {});

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>
      {Object.keys(groupedTickets).map((date) => (
        <div key={date} className="ticket-date-group">
          <h3>{date}</h3>
          <ul>
            {groupedTickets[date].map((ticket) => (
              <li
                key={ticket.id}
                style={{
                  textDecoration: ticket.completed ? "line-through" : "none",
                }}
              >
                <div>
                  <strong>{ticket.title}</strong> - {ticket.time}
                </div>
                <p>{ticket.description}</p>
                <div>
                  <button onClick={() => onEdit(ticket)}>Edit</button>
                  <button onClick={() => onDelete(ticket.id)}>Delete</button>
                  <button onClick={() => onToggleComplete(ticket.id)}>
                    {ticket.completed ? "Undo" : "Done"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
