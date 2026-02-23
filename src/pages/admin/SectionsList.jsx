import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/admin/Sections.css";

export default function SectionsList() {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const adminRaw = localStorage.getItem("admin");

  if (!adminRaw) {
    console.error("Admin not logged in");
    return;
  }

  const admin = JSON.parse(adminRaw);

  axios
    .get("http://localhost:5000/api/admin/sections", {
      headers: { "x-admin-id": admin.id },
    })
    .then((res) => {
      setSections(res.data);
    })
    .catch((err) => {
      console.error("Failed to load sections", err);
    });
}, []);


  const grouped = sections.reduce((acc, s) => {
    const key = `${s.year}-${s.branch}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
  <div className="sections-page">
    <div className="sections-header">
      <h2>Sections</h2>
      <button onClick={() => navigate("/admin/sections/add")}>
        + Add Section
      </button>
    </div>

    {Object.keys(grouped).map(group => (
      <div key={group} className="section-group">
        <h3>{group.replace("-", " Year - ")}</h3>

        <div className="section-grid">
          {grouped[group].map(sec => (
            <div key={sec.id} className="section-card">
              <h4>Section {sec.section_code}</h4>
              <p>Faculty: {sec.faculty_name || "Unassigned"}</p>
              <p>Students: {sec.student_count}</p>

              <button onClick={() => navigate(`/admin/sections/${sec.id}`)}>
                View Section →
              </button>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

}
