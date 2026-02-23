import { useEffect, useState } from "react";
import "../../styles/student/StudentDashboard.css";

export default function StudentDashboard() {
  const student = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="student-dashboard">
      <div className="student-dashboard-inner">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>
            Welcome, <span>{student?.name || "Student"}</span> 👋
          </h1>
          <p>Roll Number: <strong>{student?.roll_number || "N/A"}</strong></p>
          <p>Section: <strong>{student?.section_code || "N/A"}</strong></p>
        </div>

        {/* STATS */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Exams</h3>
            <p>8</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Exams</h3>
            <p>3</p>
          </div>
          <div className="stat-card">
            <h3>Completed Exams</h3>
            <p>5</p>
          </div>
        </div>

        {/* INFO */}
        <div className="dashboard-info">
          <h2>Quick Information</h2>
          <ul>
            <li>📌 Check the Exams section for upcoming exams.</li>
            <li>📌 Make sure to submit exams before time ends.</li>
            <li>📌 Results will appear in the Results section.</li>
            <li>📌 Contact faculty for any exam-related issues.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
