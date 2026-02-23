import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const registration_number = localStorage.getItem("registration_number");
  const role = localStorage.getItem("role") || "student"; // optional if you store role

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const endpoint =
        role === "student"
          ? `${import.meta.env.VITE_API_URL}/api/student/change-password`
          : `${import.meta.env.VITE_API_URL}/api/faculty/change-password`;

      const res = await axios.post(endpoint, {
        registration_number,
        newPassword,
      });

      setMessage("✅ Password updated successfully!");
      localStorage.removeItem("registration_number");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("❌ Password Change Error:", err);
      setMessage("Failed to update password. Try again.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>🔐 Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
      </form>
      <p className="msg">{message}</p>
    </div>
  );
}
