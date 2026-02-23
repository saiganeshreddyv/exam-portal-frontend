import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/admin/AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/faculty">Faculty</NavLink>
        <NavLink to="/admin/questions">Question Pool</NavLink>
        <NavLink to="/admin/exams">Exams</NavLink>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/sections">Sections</NavLink>
      </nav>

      <div className="admin-footer">
        <p>{admin?.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    </aside>
  );
}
