import React from "react";

const Calendar = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div className="calendar-header" key={day}>
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div className="calendar-day" key={day}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
