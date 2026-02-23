import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/FacultyList.css";

export default function FacultyList() {
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin"));

      if (!admin) {
        setError("Admin not logged in");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/admin/faculties", {
  headers: {
    "x-admin-id": admin.id
  }
});


      setFacultyList(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load faculty list");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading faculty...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="faculty-list-page">
      <div className="page-header">
        <h2>Faculty Management</h2>
        <p>View and manage all faculty members</p>
      </div>

      <div className="faculty-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Registration No</span>
          <span>Role</span>
          <span>Action</span>
        </div>

        {facultyList.map((faculty) => (
          <div key={faculty.id} className="table-row">
            <span>{faculty.name}</span>
            <span>{faculty.email}</span>
            <span>{faculty.registration_number}</span>
            <span className={`role ${faculty.role.toLowerCase()}`}>
              {faculty.role}
            </span>
            <button
              className="manage-btn"
              onClick={() =>
                navigate(`/admin/faculty/${faculty.id}`)
              }
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
