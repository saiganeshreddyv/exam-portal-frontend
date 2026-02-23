import { useLocation } from "react-router-dom";
import FacultyNavbar from "./pages/Faculty/FacultyNavbar";
import StudentNavbar from "./pages/student/StudentNavbar";

export default function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;

  const isLogin = path === "/";
  const isFaculty = path.startsWith("/faculty");
  const isStudent = path.startsWith("/student");

  return (
    <div className="app-frame">
      {/* NAVBAR ROW */}
      {!isLogin && isFaculty && <FacultyNavbar />}
      {!isLogin && isStudent && <StudentNavbar />}

      {/* CONTENT ROW */}
      <div className="app-body">
        {children}
      </div>
    </div>
  );
}
