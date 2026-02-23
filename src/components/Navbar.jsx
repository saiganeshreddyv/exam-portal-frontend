// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./../styles/Navbar.css";

// export default function Navbar() {
//   const location = useLocation();

//   return (
//     <nav className="navbar">
//       <div className="nav-logo">
//         <span>🎓 Exam<span className="highlight">Portal</span></span>
//       </div>

//       <ul className="nav-links">
//         <li className={location.pathname === "/" ? "active" : ""}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={location.pathname === "/dashboard" ? "active" : ""}>
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//         <li className={location.pathname === "/exams" ? "active" : ""}>
//           <Link to="/exams">Exams</Link>
//         </li>
//         <li className={location.pathname === "/results" ? "active" : ""}>
//           <Link to="/results">Results</Link>
//         </li>
//         <li className={location.pathname === "/profile" ? "active" : ""}>
//           <Link to="/profile">Profile</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🎓 ExamPortal</div>
      <ul className="nav-links">
        <li><Link to="/student-login">Student</Link></li>
        <li><Link to="/faculty-login">Faculty</Link></li>
        <li><Link to="/student/dashboard">Dashboard</Link></li>
        <li><Link to="/student/exams">Exams</Link></li>
      </ul>
    </nav>
  );
}
