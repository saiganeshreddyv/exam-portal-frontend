import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  console.log("🟢 Login button clicked"); // Add this
  setMessage("");
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/students/login`, {
      registration_number: regNo,
      password: password,
    });

    console.log("✅ Response:", res.data); // Add this



      if (res.data.requireChange) {
        localStorage.setItem("registration_number", regNo);
        navigate("/change-password");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>🎓 Student Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="msg">{message}</p>
    </div>
  );
}
