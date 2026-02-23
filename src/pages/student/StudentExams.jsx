// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../../styles/student/StudentExam.css";

// export default function StudentExams() {
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       setError("Unauthorized");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("http://localhost:5000/api/student/exams", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setExams(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load exams");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="student-loading">Loading exams...</p>;
//   if (error) return <p className="student-error">{error}</p>;

//   return (
//     <div className="student-exams-page">
//       <h2 className="student-exams-title">My Exams</h2>

//       <div className="student-exams-grid">
//         {exams.map((exam) => {
//           const isClickable = exam.is_active;

//           return (
//             <div
//               key={exam.id}
//               className={`student-exam-card ${!isClickable ? "disabled" : ""}`}
//               onClick={() => {
//                 if (isClickable) {
//                   navigate(`/student/exams/${exam.id}/instructions`);
//                 }
//               }}
//             >
//               <div className="exam-header">
//                 <h3>{exam.title}</h3>
//                 <span className={`exam-status ${exam.is_active ? "active" : "completed"}`}>
//                   {exam.is_active ? "Active" : "Completed"}
//                 </span>
//               </div>

//               <p className="exam-desc">{exam.description}</p>

//               <div className="exam-meta">
//                 <span><b>Date:</b> {new Date(exam.date).toLocaleDateString()}</span>
//                 <span><b>Duration:</b> {exam.duration} mins</span>
//                 <span><b>Marks:</b> {exam.total_marks}</span>
//               </div>

//               {!isClickable && (
//                 <p className="exam-note">This exam is not active</p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useExamFlow } from "../../context/ExamFlowContext";
import "../../styles/student/StudentExam.css";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ REQUIRED: Exam flow context
  const { setSelectedExam, goTo } = useExamFlow();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/student/exams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setExams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load exams");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="student-loading">Loading exams...</p>;
  }

  if (error) {
    return <p className="student-error">{error}</p>;
  }

  return (
    <div className="student-exams-page">
      <h2 className="student-exams-title">My Exams</h2>

      <div className="student-exams-grid">
        {exams.map((exam) => {
          const isClickable = exam.is_active;

          return (
            <div
              key={exam.id}
              className={`student-exam-card ${
                !isClickable ? "disabled" : ""
              }`}
              onClick={() => {
                if (!isClickable) return;

                // ✅ Set exam in context
                setSelectedExam(exam);

                // ✅ Move flow to instructions
                goTo("INSTRUCTIONS");

                // ✅ Navigate to single exam flow route
                navigate("/student/exam-flow");
              }}
            >
              <div className="exam-header">
                <h3>{exam.title}</h3>
                <span
                  className={`exam-status ${
                    exam.is_active ? "active" : "completed"
                  }`}
                >
                  {exam.is_active ? "Active" : "Completed"}
                </span>
              </div>

              <p className="exam-desc">{exam.description}</p>

              <div className="exam-meta">
                <span>
                  <b>Date:</b>{" "}
                  {exam.date
                    ? new Date(exam.date).toLocaleDateString()
                    : "—"}
                </span>
                <span>
                  <b>Duration:</b> {exam.duration} mins
                </span>
                <span>
                  <b>Marks:</b> {exam.total_marks}
                </span>
              </div>

              {!isClickable && (
                <p className="exam-note">This exam is not active</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
