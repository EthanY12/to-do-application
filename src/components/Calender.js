import React, { useState, useEffect } from 'react';
import './Calender.css';
import TicketModal from './TicketModal';
import authService from '../services/authServer';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await authService.getTickets();
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      }
    };

    fetchTickets();
  }, []);

  const handleAddTicket = async (ticket) => {
    try {
      if (editingTicket) {
        const response = await authService.updateTicket(editingTicket.id, ticket);
        setTickets(tickets.map(t => (t.id === editingTicket.id ? response.data : t)));
        setEditingTicket(null);
      } else {
        const response = await authService.createTicket(ticket);
        setTickets([...tickets, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add ticket', error);
    }
  };

  const handleDeleteTicket = async (id) => {
    try {
      await authService.deleteTicket(id);
      setTickets(tickets.filter(ticket => ticket.id !== id));
    } catch (error) {
      console.error('Failed to delete ticket', error);
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const startOfWeek = (date) => {
    const diff = date.getDate() - date.getDay();
    return new Date(date.setDate(diff));
  };

  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const weekStartDate = startOfWeek(new Date(currentDate));
  const weekDays = getWeekDays(weekStartDate);
  const timeSlots = generateTimeSlots();

  const getTicketsForSlot = (date, time) => {
    return tickets.filter(ticket => ticket.date === date && ticket.time === time);
  };

  return (
    <div className="calendar-container">
      <div className="ticket-list">
        <h2>Create Ticket</h2>
        <button onClick={() => setIsModalOpen(true)}>New Ticket</button>
      </div>
      <div className="ticket-list">
        <h2>Tickets</h2>
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <strong>{ticket.title}</strong> - {ticket.date} {ticket.time}
              <button onClick={() => handleEditTicket(ticket)}>Edit</button>
              <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="calendar-header">
        <button onClick={handlePrevWeek}>Previous</button>
        <h2>Week of {weekStartDate.toDateString()}</h2>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-time-column">
          <div className="calendar-header timeslot-header">Timeslot</div>
          {timeSlots.map((slot, index) => (
            <div key={index} className="calendar-time-slot">
              {slot}
            </div>
          ))}
        </div>
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="calendar-day-column">
            <div className="calendar-header">{daysOfWeek[day.getDay()]} {day.getDate()}</div>
            {timeSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="calendar-slot">
                {getTicketsForSlot(day.toISOString().split('T')[0], slot).map(ticket => (
                  <div key={ticket.id} className="ticket">
                    <strong>{ticket.title}</strong>
                    <p>{ticket.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <TicketModal
        isOpen={isModalOpen}
        onRequestClose={() => { setIsModalOpen(false); setEditingTicket(null); }}
        onAddTicket={handleAddTicket}
        editingTicket={editingTicket}
      />
    </div>
  );
};

export default Calendar;