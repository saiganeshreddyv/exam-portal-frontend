import AdminSidebar from "./AdminSidebar";
import "../../styles/admin/AdminLayout.css";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    // <div className="admin-layout">
    //   <AdminSidebar />
    //   <div className="admin-content">
    //     <Outlet />
    //   </div>
    // </div>
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <AdminSidebar />
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>

  );
}
