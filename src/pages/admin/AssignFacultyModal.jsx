import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin/AssignFacultyModal.css";

export default function AssignFacultyModal({
  open,
  onClose,
  sectionId,
  onAssigned
}) {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchFaculty();
    }
  }, [open]);

  const fetchFaculty = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/faculty",
      { headers: { "x-admin-id": admin.id } }
    );
    setFacultyList(res.data);
  };

  const assignFaculty = async () => {
    if (!selectedFaculty) return;

    setLoading(true);
    await axios.put(
      `http://localhost:5000/api/admin/sections/${sectionId}/assign-faculty`,
      { facultyId: selectedFaculty },
      { headers: { "x-admin-id": admin.id } }
    );

    setLoading(false);
    onAssigned();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Assign Faculty</h3>

        <div className="faculty-list">
          {facultyList.map(f => (
            <label key={f.id} className="faculty-item">
              <input
                type="radio"
                name="faculty"
                value={f.id}
                onChange={() => setSelectedFaculty(f.id)}
              />
              <span>{f.name} ({f.email})</span>
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="primary"
            disabled={!selectedFaculty || loading}
            onClick={assignFaculty}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
