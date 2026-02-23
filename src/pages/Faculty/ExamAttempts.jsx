import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/faculty/ExamAttempts.css";

export default function ExamAttempts() {
  const { examId } = useParams();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/faculty/results/${examId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAttempts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [examId]);

  const publishResults = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/faculty/exams/${examId}/publish-results`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Results published");
  };

  if (loading) return <p>Loading attempts...</p>;

  return (
    <div className="exam-attempts-page">
      <h2>Student Attempts</h2>

      <button className="publish-btn" onClick={publishResults}>
        Publish Results
      </button>

      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Status</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Attempted</th>
            <th>Malpractice</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a) => (
            <tr key={a.student_id}>
              <td>{a.roll_number}</td>
              <td>{a.name}</td>
              <td>{a.status}</td>
              <td>{a.score}</td>
              <td>{a.correct_count}</td>
              <td>{a.attempted_count}</td>
              <td>{a.malpractice_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
