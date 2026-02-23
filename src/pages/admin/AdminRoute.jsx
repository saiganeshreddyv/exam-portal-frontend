import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin || !["ADMIN", "SUPER_ADMIN"].includes(admin.role)) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
