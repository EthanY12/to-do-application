import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Calendar from "./components/Calender";
import authServer from "./services/authServer";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authServer.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authServer.logout();
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/calendar"
            element={user ? <Calendar user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
