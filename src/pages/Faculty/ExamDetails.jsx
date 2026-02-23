// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import "../../styles/faculty/ExamDetails.css";

// export default function ExamDetails() {
//   const { examId } = useParams();
//   const navigate = useNavigate();

//   const [exam, setExam] = useState(null);
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetchExamDetails();
//   }, []);

//   const fetchExamDetails = async () => {
//     try {
//       const examRes = await axios.get(
//         `http://localhost:5000/api/faculty/exams/${examId}`
//       );

//       const questionRes = await axios.get(
//         `http://localhost:5000/api/faculty/exams/${examId}/questions`
//       );

//       setExam(examRes.data);
//       setQuestions(questionRes.data);
//     } catch (err) {
//       console.error("Failed to load exam details", err);
//     }
//   };

//   if (!exam) return <p>Loading exam details...</p>;

//   return (
//     <div className="exam-details-page">
//       {/* ================= EXAM SUMMARY ================= */}
//       <div className="exam-summary">
//         <h2>{exam.title}</h2>
//         <p>{exam.description}</p>

//         <div className="exam-meta">
//           <span>📅 {exam.date}</span>
//           <span>⏱ {exam.duration} mins</span>
//           <span>📝 {exam.total_marks} marks</span>
//         </div>
//       </div>

//       {/* ================= QUESTIONS HEADER ================= */}
//       <div className="questions-header">
//         <h3>Questions in this Exam</h3>
//         <button
//           className="add-question-btn"
//           onClick={() =>
//             navigate(`/faculty/exams/${examId}/add-questions`)
//           }
//         >
//           + Add Questions
//         </button>
//       </div>

//       {/* ================= QUESTIONS LIST ================= */}
//       <div className="questions-list">
//         {questions.length === 0 && <p>No questions added yet.</p>}

//         {questions.map((q, index) => (
//           <div key={q.id} className="question-card">
//             <div className="question-top">
//               <h4>
//                 Q{index + 1}. {q.question}
//               </h4>
//               <button className="remove-btn">Remove</button>
//             </div>

//             <ul className="options">
//               <li>A. {q.option_a}</li>
//               <li
//                 className={
//                   q.correct_option === "B" ? "correct" : ""
//                 }
//               >
//                 B. {q.option_b}
//               </li>
//               <li>C. {q.option_c}</li>
//               <li>D. {q.option_d}</li>
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/faculty/ExamDetails.css";

export default function ExamDetails() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const faculty = JSON.parse(localStorage.getItem("user"));

      if (!faculty || !faculty.id) {
        setError("Faculty not logged in");
        return;
      }

      const headers = {
        headers: {
          "x-faculty-id": faculty.id,
        },
      };

      const examRes = await axios.get(
        `http://localhost:5000/api/faculty/exams/${examId}`,
        headers
      );

      const questionRes = await axios.get(
        `http://localhost:5000/api/faculty/exams/${examId}/questions`,
        headers
      );

      setExam(examRes.data);
      setQuestions(questionRes.data);
    } catch (err) {
      console.error("Failed to load exam details", err);
      setError("Failed to load exam details");
    }
  };

  if (error) return <p className="error-text">{error}</p>;
  if (!exam) return <p>Loading exam details...</p>;

  return (
    <div className="exam-details-page">
      {/* ================= EXAM SUMMARY ================= */}
      <div className="exam-summary">
        <h2>{exam.title}</h2>
        <p>{exam.description}</p>

        <div className="exam-meta">
          <span>📅 {exam.date}</span>
          <span>⏱ {exam.duration} mins</span>
          <span>📝 {exam.total_marks} marks</span>
        </div>
      </div>

      {/* ================= QUESTIONS HEADER ================= */}
      <div className="questions-header">
        <h3>Questions in this Exam</h3>
        <button
          className="add-question-btn"
          onClick={() =>
            navigate(`/faculty/exams/${examId}/add-questions`)
          }
        >
          + Add Questions
        </button>
      </div>

      {/* ================= QUESTIONS LIST ================= */}
      <div className="questions-list">
        {questions.length === 0 && (
          <p>No questions added yet.</p>
        )}

        {questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <div className="question-top">
              <h4>
                Q{index + 1}. {q.question}
              </h4>
            </div>

            <ul className="options">
              <li className={q.correct_option === "A" ? "correct" : ""}>
                A. {q.option_a}
              </li>
              <li className={q.correct_option === "B" ? "correct" : ""}>
                B. {q.option_b}
              </li>
              <li className={q.correct_option === "C" ? "correct" : ""}>
                C. {q.option_c}
              </li>
              <li className={q.correct_option === "D" ? "correct" : ""}>
                D. {q.option_d}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
