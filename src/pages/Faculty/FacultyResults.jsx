import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/faculty/FacultyResults.css";

export default function FacultyResults() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/faculty/results", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading results...</p>;

  return (
    <div className="faculty-results-page">
  <h2 className="results-title">Exam Results</h2>

  <div className="results-grid">
    {exams.map((exam) => (
      <div
        key={exam.exam_id}
        className="result-card"
        onClick={() => navigate(`/faculty/results/${exam.exam_id}`)}
      >
        <h3>{exam.title}</h3>

        <div className="result-stats">
          <p><b>Total Attempts:</b> {exam.total_attempts}</p>
          <p><b>Submitted:</b> {exam.submitted_attempts}</p>
          <p><b>Avg Score:</b> {Number(exam.avg_score).toFixed(1)}</p>
        </div>

        <span
          className={`publish-status ${
            exam.results_published ? "published" : "not-published"
          }`}
        >
          {exam.results_published ? "Published" : "Not Published"}
        </span>
      </div>
    ))}
  </div>
</div>
  );
}
