// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/admin/FacultyDetails.css";

// export default function FacultyDetail() {
//   const { facultyId } = useParams();
//   const navigate = useNavigate();

//   const [faculty, setFaculty] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchFacultyOverview();
//   }, [facultyId]);

// const fetchFacultyOverview = async () => {
//   try {
//     setLoading(true);

//     const admin = JSON.parse(localStorage.getItem("admin"));

//     const res = await axios.get(
//       `http://localhost:5000/api/admin/faculty/${facultyId}/overview`,
//       {
//         headers: {
//           "x-admin-id": admin.id, // 🔴 THIS IS THE FIX
//         },
//       }
//     );

//     setFaculty(res.data.faculty);
//     setStats(res.data.stats);
//   } catch (err) {
//     console.error(err);
//     setError("Failed to load faculty details");
//   } finally {
//     setLoading(false);
//   }
// };


// const toggleStatus = async () => {
//   try {
//     const admin = JSON.parse(localStorage.getItem("admin"));

//     const res = await axios.patch(
//       `http://localhost:5000/api/admin/faculty/${faculty.id}/status`,
//       {},
//       {
//         headers: {
//           "x-admin-id": admin.id,
//         },
//       }
//     );

//     setFaculty((prev) => ({
//       ...prev,
//       status: res.data.status,
//     }));
//   } catch (err) {
//     console.error(err);
//     alert("Failed to update status");
//   }
// };

//   if (loading) {
//     return <div className="faculty-detail-page">Loading...</div>;
//   }

//   if (error) {
//     return <div className="faculty-detail-page">{error}</div>;
//   }

//   return (
//     <div className="faculty-detail-page">
//       {/* ================= FACULTY SUMMARY ================= */}
//       <div className="faculty-summary-card">
//         <div className="faculty-main">
//           <h2>{faculty.name}</h2>
//           <p>{faculty.email}</p>
//         </div>

//         <div className="faculty-meta">
//           <div>
//             <span className="label">Registration No</span>
//             <span>{faculty.reg_no}</span>
//           </div>

//           <div>
//             <span className="label">Role</span>
//             <span className={`role ${faculty.role.toLowerCase()}`}>
//               {faculty.role}
//             </span>
//           </div>

//           <div>
//   <span className="label">Status</span>

//   <label className="switch">
//     <input
//       type="checkbox"
//       checked={faculty.status}
//       onChange={toggleStatus}
//     />
//     <span className="slider"></span>
//   </label>
// </div>

//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="faculty-stats-grid">
//         <div
//           className="stat-card"
//           onClick={() => navigate("questions")}
//         >
//           <h3>Questions</h3>
//           <p className="count">{stats.questions}</p>
//           <span className="cta">View Questions →</span>
//         </div>

//         <div
//           className="stat-card"
//           onClick={() => navigate("exams")}
//         >
//           <h3>Exams</h3>
//           <p className="count">{stats.exams}</p>
//           <span className="cta">View Exams →</span>
//         </div>

//         <div
//           className="stat-card"
//           onClick={() => navigate("sections")}
//         >
//           <h3>Sections</h3>
//           <p className="count">{stats.sections}</p>
//           <span className="cta">View Sections →</span>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/FacultyDetails.css";

export default function FacultyDetail() {
  const { facultyId } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFacultyOverview();
  }, [facultyId]);

  const fetchFacultyOverview = async () => {
    try {
      setLoading(true);

      const admin = JSON.parse(localStorage.getItem("admin"));

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/faculty/${facultyId}/overview`,
        {
          headers: { "x-admin-id": admin.id },
        }
      );

      setFaculty(res.data.faculty);   // ← includes status
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
      setError("Failed to load faculty details");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    if (!faculty) return;

    // ✅ Ask confirmation ONLY when disabling
    if (faculty.status === true) {
      const confirmDisable = window.confirm(
        "Are you sure you want to deactivate this faculty?\n\nThey will not be able to log in."
      );

      if (!confirmDisable) return;
    }

    try {
      const admin = JSON.parse(localStorage.getItem("admin"));

      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/faculty/${faculty.id}/status`,
        {},
        {
          headers: { "x-admin-id": admin.id },
        }
      );

      // ✅ Always trust backend response
      setFaculty((prev) => ({
        ...prev,
        status: res.data.status,
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return <div className="faculty-detail-page">Loading...</div>;
  }

  if (error) {
    return <div className="faculty-detail-page">{error}</div>;
  }

  return (
    <div className="faculty-detail-page">
      {/* ================= FACULTY SUMMARY ================= */}
      <div className="faculty-summary-card">
        <div className="faculty-main">
          <h2>{faculty.name}</h2>
          <p>{faculty.email}</p>
        </div>

        <div className="faculty-meta">
          <div>
            <span className="label">Registration No</span>
            <span>{faculty.reg_no}</span>
          </div>

          <div>
            <span className="label">Role</span>
            <span className={`role ${faculty.role.toLowerCase()}`}>
              {faculty.role}
            </span>
          </div>

          <div>
            <span className="label">Status</span>

            <label className="switch">
              <input
                type="checkbox"
                checked={faculty?.status ?? false}
                onChange={toggleStatus}
                disabled={!faculty}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="faculty-stats-grid">
        <div className="stat-card" onClick={() => navigate("questions")}>
          <h3>Questions</h3>
          <p className="count">{stats.questions}</p>
          <span className="cta">View Questions →</span>
        </div>

        <div className="stat-card" onClick={() => navigate("exams")}>
          <h3>Exams</h3>
          <p className="count">{stats.exams}</p>
          <span className="cta">View Exams →</span>
        </div>

        <div className="stat-card" onClick={() => navigate("sections")}>
          <h3>Sections</h3>
          <p className="count">{stats.sections}</p>
          <span className="cta">View Sections →</span>
        </div>
      </div>
    </div>
  );
}
