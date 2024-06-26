import React from 'react';
import "./Calender.css"

const Calendar = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = generateTimeSlots();

  function generateTimeSlots() {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        <div className="calendar-header timeslot-header">Timeslot</div>
        {daysOfWeek.map((day) => (
          <div className="calendar-header" key={day}>{day}</div>
        ))}
        <div className="calendar-time-column">
          {timeSlots.map((slot, index) => (
            <div key={index} className="calendar-time-slot">
              {slot}
            </div>
          ))}
        </div>
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="calendar-day-column">
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
