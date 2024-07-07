import React from 'react';

const TicketList = ({ tickets = [], onEdit, onDelete }) => {
  // Ensure tickets is an array before sorting
  const sortedTickets = Array.isArray(tickets) ? tickets.sort((a, b) => {
    const dateComparison = new Date(a.date) - new Date(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return a.time.localeCompare(b.time);
  }) : [];

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
      {Object.keys(groupedTickets).length > 0 ? (
        Object.keys(groupedTickets).map(date => (
          <div key={date} className="ticket-date-group">
            <h3>{date}</h3>
            <ul>
              {groupedTickets[date].map(ticket => (
                <li key={ticket.id}>
                  <div>
                    <strong>{ticket.title}</strong> - {ticket.time}
                  </div>
                  <p>{ticket.description}</p>
                  <div>
                    <button onClick={() => onEdit(ticket)}>Edit</button>
                    <button onClick={() => onDelete(ticket.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No tickets available</p>
      )}
    </div>
  );
};

export default TicketList;
