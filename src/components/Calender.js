import React, { useState } from 'react';
import "./Calender.css"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevWeek}>Previous</button>
        <h2>Week of {weekStartDate.toDateString()}</h2>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-time-column">
          <div className="calendar-header timeslot-header">Time slot</div>
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
              <div key={slotIndex} className="calendar-slot"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
