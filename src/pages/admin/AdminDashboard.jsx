import "../../styles/admin/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">
        Control faculty, students, exams, question pools, and sections.
      </p>

      {/* ANALYTICS */}
      <div className="analytics-row">
        <div className="analytics-card">
          <h3>Total Faculties</h3>
          <span>12</span>
        </div>

        <div className="analytics-card">
          <h3>Total Students</h3>
          <span>480</span>
        </div>

        <div className="analytics-card">
          <h3>Total Exams</h3>
          <span>36</span>
        </div>

        <div className="analytics-card">
          <h3>Total Questions</h3>
          <span>920</span>
        </div>
      </div>

      {/* MAIN CARDS */}
      <div className="dashboard-cards">
        <div className="dashboard-card faculty"
            onClick={() => navigate("/admin/faculty")}
        >
            👩‍🏫
            <h2>Faculties</h2>
            <p>View and manage all faculty members</p>
        </div>


        <div className="dashboard-card students">
          🎓
          <h2>Students</h2>
          <p>View and manage students section-wise</p>
        </div>

        <div className="dashboard-card exams">
          📝
          <h2>Exams</h2>
          <p>View all exams created by faculties</p>
        </div>

        <div className="dashboard-card questions">
          📚
          <h2>Question Pool</h2>
          <p>Global question pool across faculties</p>
        </div>
        
        <div className="dashboard-card sections"
            onClick={() => navigate("/admin/sections")}
        >
            🏷️
            <h2>Sections</h2>
            <p>Manage sections and assign students</p>
        </div>
      </div>
    </div>
  );
}
