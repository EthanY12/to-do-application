import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authServer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(username, password);
      console.log("Logged in user:", user);
      if (user.token) {
        navigate("/calendar");
      } else {
        setError("Login failed. No token received.");
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message,
      );
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
