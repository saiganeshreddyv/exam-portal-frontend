import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/faculty/ExamList.css";
import { useNavigate } from "react-router-dom";

export default function ExamList() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExams();
  }, []);

  /* ================= FETCH EXAMS ================= */
  const fetchExams = async () => {
    try {
      const faculty = JSON.parse(localStorage.getItem("user"));

      if (!faculty || !faculty.id) {
        setError("Faculty not logged in");
        return;
      }

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faculty/exams/faculty/${faculty.id}`
      );

      setExams(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

const toggleStatus = async (examId) => {
  try {
    const faculty = JSON.parse(localStorage.getItem("user"));

    if (!faculty?.id) {
      alert("Faculty not logged in");
      return;
    }

    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/faculty/exams/${examId}/status`,
      {},
      {
        headers: {
          "x-faculty-id": faculty.id,
        },
      }
    );

    setExams((prev) =>
      prev.map((exam) =>
        exam.id === examId
          ? { ...exam, is_active: res.data.is_active }
          : exam
      )
    );
  } catch (err) {
    console.error("Toggle failed", err);
    alert("Failed to update exam status");
  }
};


  /* ================= DELETE ================= */
  const deleteExam = async (examId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this exam?"
  );
  if (!confirmDelete) return;

  try {
    const faculty = JSON.parse(localStorage.getItem("faculty"));

    if (!faculty?.id) {
      alert("Faculty not logged in");
      return;
    }

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/faculty/exams/${examId}`,
      {
        headers: {
          "x-faculty-id": faculty.id,
        },
      }
    );

    fetchExams();
  } catch (err) {
    console.error("Failed to delete exam", err);
    alert("Failed to delete exam");
  }
};


  if (loading) return <p>Loading exams...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="exam-page">
      {/* HEADER */}
      <div className="exam-header">
        <h2>📚 All Exams</h2>
        <button
          className="create-exam-btn"
          onClick={() => navigate("/faculty/create-exam")}
        >
          + Create Exam
        </button>
      </div>

      {/* GRID */}
      <div className="exam-grid">
        {exams.length === 0 && <p>No exams created yet.</p>}

{exams.map((exam) => {
  const isActive = exam.is_active === true;

  return (
    <div key={exam.id} className="exam-card">
      <div className="exam-card-top">
        <h3>{exam.title}</h3>

        <span
          className={`status ${isActive ? "active" : "inactive"}`}
          onClick={() => toggleStatus(exam.id)}
          style={{ cursor: "pointer" }}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="exam-desc">{exam.description}</p>

      <div className="exam-info">
        <span>📅 {exam.date}</span>
        <span>⏱ {exam.duration} mins</span>
        <span>📝 {exam.total_marks} marks</span>
      </div>

      <div className="exam-actions">
        <button
          className="manage-btn"
          onClick={() => navigate('/faculty/exams/' + exam.id)}
        >
          Manage
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteExam(exam.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
}