// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
// import "../../styles/faculty/FacultyNavbar.css";

// export default function FacultyNavbar() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("faculty");
//     navigate("/");
//   };

//   return (
//     <nav className="faculty-pro-navbar">
//       <div className="faculty-brand">
//         <img src="/faculty-icon.png" className="faculty-icon" alt="" />
//         <span>Faculty Portal</span>
//       </div>

//       <div className="faculty-toggle" onClick={() => setOpen(!open)}>
//         {open ? <FiX size={26} /> : <FiMenu size={26} />}
//       </div>

//       <div className={`faculty-menu ${open ? "open" : ""}`}>
//         <Link to="/faculty/dashboard" className="faculty-link">Dashboard</Link>
//         <Link to="/faculty/create-exam" className="faculty-link">Create Exam</Link>
//         <Link to="/faculty/exams" className="faculty-link">Exam List</Link>
//         <Link to="/faculty/results" className="faculty-link">Results</Link>

//         <button className="faculty-logout-btn" onClick={handleLogout}>
//           <FiLogOut size={18} />
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import "../../styles/faculty/FacultyNavbar.css";

export default function FacultyNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const faculty = JSON.parse(localStorage.getItem("user"));

  // ✅ Safety: render navbar only for faculty
  if (role !== "faculty" || !faculty) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="faculty-pro-navbar">
      <div className="faculty-brand">
        <img src="/faculty-icon.png" className="faculty-icon" alt="" />
        <span>Faculty Portal</span>
      </div>

      <div className="faculty-toggle" onClick={() => setOpen(!open)}>
        {open ? <FiX size={26} /> : <FiMenu size={26} />}
      </div>

      <div className={`faculty-menu ${open ? "open" : ""}`}>
        <Link to="/faculty/dashboard" className="faculty-link">
          Dashboard
        </Link>
        <Link to="/faculty/create-exam" className="faculty-link">
          Create Exam
        </Link>
        <Link to="/faculty/exams" className="faculty-link">
          Exam List
        </Link>
<Link to="/faculty/results" className="faculty-link">
  Results
</Link>


        <button className="faculty-logout-btn" onClick={handleLogout}>
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
}
