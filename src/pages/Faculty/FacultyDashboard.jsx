// import React from "react";
// import "../../styles/faculty/FacultyDashboard.css";
// import { useNavigate } from "react-router-dom";

// export default function FacultyDashboard() {
//   const navigate = useNavigate();
//   const faculty = JSON.parse(localStorage.getItem("faculty"));

//   return (
//     <>
//       <div className="faculty-dashboard">
//         <div className="welcome-section">
//           <h2>
//             Welcome, <span>{faculty?.name || "Faculty Member"}</span> 👋
//           </h2>
//           <p>Manage your exams and analyze student performance here.</p>
//         </div>

//         <div className="dashboard-grid">
//           <div
//             className="card create"
//             onClick={() => navigate("/faculty/create-exam")}
//           >
//             <div className="icon">📝</div>
//             <h3>Create Exam</h3>
//             <p>Set up a new exam for your students.</p>
//           </div>

//           <div
//             className="card view"
//             onClick={() => navigate("/faculty/exams")}
//           >
//             <div className="icon">📋</div>
//             <h3>View Exams</h3>
//             <p>See all the exams you’ve created.</p>
//           </div>

//           <div
//             className="card results"
//             onClick={() => navigate("/faculty/results")}
//           >
//             <div className="icon">📊</div>
//             <h3>Results</h3>
//             <p>Monitor student performance and reports.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React from "react";
import "../../styles/faculty/FacultyDashboard.css";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const faculty = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="faculty-dashboard">
      {/* Welcome */}
      <div className="welcome-section">
        <h2>
          Welcome, <span>{faculty?.name || "Faculty Member"}</span>
        </h2>
        <p>Manage your exams and analyze student performance here.</p>
      </div>

      {/* ================= EXAM MANAGEMENT ================= */}
      <h3 className="section-title">Exam Management</h3>
      <div className="dashboard-grid">
        <div
          className="card create"
          onClick={() => navigate("/faculty/create-exam")}
        >
          <div className="icon">📝</div>
          <h4>Create Exam</h4>
          <p>Set up a new exam for your students.</p>
        </div>

        <div
          className="card view"
          onClick={() => navigate("/faculty/exams")}
        >
          <div className="icon">📋</div>
          <h4>View Exams</h4>
          <p>View, manage, and edit your exams.</p>
        </div>

        <div
          className="card results"
          onClick={() => navigate("/faculty/results")}
        >
          <div className="icon">📊</div>
          <h4>Results</h4>
          <p>Monitor student performance and reports.</p>
        </div>
      </div>

      {/* ================= QUESTION MANAGEMENT ================= */}
      <h3 className="section-title">Question Management</h3>
      <div className="dashboard-grid">
        <div
          className="card questions"
          onClick={() => navigate("/faculty/add-question")}
        >
          <div className="icon">➕</div>
          <h4>Add Question</h4>
          <p>Add questions to the global question pool.</p>
        </div>

        <div
          className="card pool"
          onClick={() => navigate("/faculty/questions")}
        >
          <div className="icon">📚</div>
          <h4>Questions Pool</h4>
          <p>View and edit all added questions.</p>
        </div>

        {/* Empty slot to keep 3-column symmetry (optional) */}
        <div className="card placeholder" />
      </div>
    </div>
  );
}
