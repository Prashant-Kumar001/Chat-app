import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example hardcoded admin credentials (Replace with backend API call)
    const ADMIN_CREDENTIALS = {
      username: "admin",
      password: "admin123",
    };

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("role", "admin"); // Store admin role
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid admin credentials!");
    }
  };

  const isLogin = localStorage.getItem("role")

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Admin Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
