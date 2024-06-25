import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={onLogout}>Logout</button>
      <Link to="/calendar">Go to Calendar</Link>
    </div>
  );
};

export default Home;
