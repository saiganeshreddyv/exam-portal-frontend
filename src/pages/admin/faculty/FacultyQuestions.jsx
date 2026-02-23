import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/admin/FacultyQuestions.css";

export default function FacultyQuestions() {
  const { facultyId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/admin/faculty/${facultyId}/questions`,
        { headers: { "x-admin-id": admin.id } }
      )
      .then(res => {
        console.log("QUESTIONS:", res.data); // 🔴 ADD THIS
        setQuestions(res.data);
      })
      .catch(console.error);
  }, [facultyId]);

  if (questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
  <div className="faculty-list-page">
    <h2 className="page-title">Faculty Questions</h2>

    {questions.map(q => (
      <div key={q.id} className="question-card">
        <p className="question-text">{q.question}</p>
        <div className="question-meta">
          <span className="marks">Marks: {q.marks}</span>
        </div>
      </div>
    ))}
  </div>
);

}
