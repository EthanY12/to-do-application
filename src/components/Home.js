import React from 'react';

    const Home = ({ user, handleLogout }) => {
    return (
        <div className="home-container">
        <h1>Welcome, {user ? user.username : 'Guest'}</h1>
        {user ? (
            <button onClick={handleLogout}>Logout</button>
        ) : (
            <p>Please log in or register to access your tasks.</p>
        )}
        </div>
    );
    };

export default Home;
