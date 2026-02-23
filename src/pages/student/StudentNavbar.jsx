import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import "../../styles/student/StudentNavbar.css";
import "./StudentExam"

export default function StudentNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const student = JSON.parse(localStorage.getItem("user"));

  // ✅ Safety: render only for student
  if (role !== "student" || !student) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="student-pro-navbar">
      {/* BRAND */}
      <div className="student-brand">
        <img src="/student-icon.png" className="student-icon" alt="" />
        <span>Student Portal</span>
      </div>

      {/* MOBILE TOGGLE */}
      <div className="student-toggle" onClick={() => setOpen(!open)}>
        {open ? <FiX size={26} /> : <FiMenu size={26} />}
      </div>

      {/* MENU */}
      <div className={`student-menu ${open ? "open" : ""}`}>
        <Link to="/student/dashboard" className="student-link">
          Dashboard
        </Link>
        <Link to="/student/exams" className="student-link">
          Exams
        </Link>
        <Link to="/student/results" className="student-link">
          Results
        </Link>

        <button className="student-logout-btn" onClick={handleLogout}>
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
