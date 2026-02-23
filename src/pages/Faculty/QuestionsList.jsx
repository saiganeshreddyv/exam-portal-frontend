// // import React, { useEffect, useState } from "react";
// // import "../../styles/faculty/QuestionsList.css";
// // import { useNavigate } from "react-router-dom";

// // export default function QuestionsList() {
// //   const [questions, setQuestions] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [markFilter, setMarkFilter] = useState("all");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchQuestions();
// //   }, []);

// //   const fetchQuestions = async () => {
// //     const res = await fetch("http://localhost:5000/api/questions");
// //     const data = await res.json();
// //     setQuestions(data);
// //   };

// //   const handleDelete = async (id) => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete this question?"
// //     );
// //     if (!confirmDelete) return;

// //     await fetch(`http://localhost:5000/api/questions/${id}`, {
// //       method: "DELETE",
// //     });

// //     fetchQuestions();
// //   };

// //   const filtered = questions.filter((q) => {
// //     const matchSearch = q.question
// //       .toLowerCase()
// //       .includes(search.toLowerCase());
// //     const matchMarks =
// //       markFilter === "all" || q.marks === Number(markFilter);
// //     return matchSearch && matchMarks;
// //   });

// //   const grouped = filtered.reduce((acc, q) => {
// //     acc[q.marks] = acc[q.marks] || [];
// //     acc[q.marks].push(q);
// //     return acc;
// //   }, {});

// //   return (
// //     <div className="questions-container">
// //       {/* HEADER */}
// //       <div className="questions-header">
// //         <h2>Questions Pool</h2>

// //         <div className="questions-controls">
// //           <input
// //             type="text"
// //             placeholder="Search question..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />

// //           <select
// //             value={markFilter}
// //             onChange={(e) => setMarkFilter(e.target.value)}
// //           >
// //             <option value="all">All Marks</option>
// //             <option value="1">1 Mark</option>
// //             <option value="2">2 Marks</option>
// //             <option value="5">5 Marks</option>
// //           </select>

// //           <button
// //             className="add-question-btn"
// //             onClick={() => navigate("/faculty/add-question")}
// //           >
// //             + Add Question
// //           </button>
// //         </div>
// //       </div>

// //       {/* QUESTIONS */}
// //       {Object.entries(grouped).map(([marks, qs]) => (
// //         <div key={marks} className="marks-block">
// //           <h3>{marks} Mark Questions</h3>

// //           {qs.map((q, index) => (
// //             <div key={q.id} className="question-card">
// //               {/* TOP ROW */}
// //               <div className="question-row">
// //                 <div className="question-text">
// //                   <strong>Q{index + 1}.</strong> {q.question}
// //                 </div>

// //                 <div className="question-actions">
// //                   <button
// //                     className="edit-btn"
// //                     onClick={() =>
// //                       navigate(`/faculty/edit-question/${q.id}`)
// //                     }
// //                   >
// //                     Edit
// //                   </button>

// //                   <button
// //                     className="delete-btn"
// //                     onClick={() => handleDelete(q.id)}
// //                   >
// //                     Delete
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* OPTIONS */}
// //               <div className="options-grid">
// //                 <p>A. {q.option_a}</p>
// //                 <p>B. {q.option_b}</p>
// //                 <p>C. {q.option_c}</p>
// //                 <p>D. {q.option_d}</p>
// //               </div>

// //               {/* ANSWER */}
// //               <div className="correct-answer">
// //                 ✔ Correct Answer: <span>{q.correct_option}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import "../../styles/faculty/QuestionsList.css";
// import { useNavigate } from "react-router-dom";

// export default function QuestionsList() {
//   const [questions, setQuestions] = useState([]);
//   const [search, setSearch] = useState("");
//   const [markFilter, setMarkFilter] = useState("all");
//   const navigate = useNavigate();

//   /* ================= FIX: LOCK SCROLL POSITION ================= */
//   useEffect(() => {
//     requestAnimationFrame(() => {
//       window.scrollTo({ top: 0, behavior: "auto" });
//     });
//   }, [questions.length, markFilter, search]);
//   /* ============================================================= */

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     const res = await fetch("http://localhost:5000/api/questions");
//     const data = await res.json();
//     setQuestions(data);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this question?"
//     );
//     if (!confirmDelete) return;

//     await fetch(`http://localhost:5000/api/questions/${id}`, {
//       method: "DELETE",
//     });

//     fetchQuestions();
//   };

//   const filtered = questions.filter((q) => {
//     const matchSearch = q.question
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const matchMarks =
//       markFilter === "all" || q.marks === Number(markFilter);
//     return matchSearch && matchMarks;
//   });

//   const grouped = filtered.reduce((acc, q) => {
//     acc[q.marks] = acc[q.marks] || [];
//     acc[q.marks].push(q);
//     return acc;
//   }, {});

//   return (
//     <div className="questions-container">
//       {/* HEADER */}
//       <div className="questions-header">
//         <h2>Questions Pool</h2>

//         <div className="questions-controls">
//           <input
//             type="text"
//             placeholder="Search question..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             value={markFilter}
//             onChange={(e) => setMarkFilter(e.target.value)}
//           >
//             <option value="all">All Marks</option>
//             <option value="1">1 Mark</option>
//             <option value="2">2 Marks</option>
//             <option value="5">5 Marks</option>
//           </select>

//           <button
//             className="add-question-btn"
//             onClick={() => navigate("/faculty/add-question")}
//           >
//             + Add Question
//           </button>
//         </div>
//       </div>

//       {/* QUESTIONS */}
//       {Object.entries(grouped).map(([marks, qs]) => (
//         <div key={marks} className="marks-block">
//           <h3>{marks} Mark Questions</h3>

//           {qs.map((q, index) => (
//             <div key={q.id} className="question-card">
//               {/* TOP ROW */}
//               <div className="question-row">
//                 <div className="question-text">
//                   <strong>Q{index + 1}.</strong> {q.question}
//                 </div>

//                 <div className="question-actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() =>
//                       navigate(`/faculty/edit-question/${q.id}`)
//                     }
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(q.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               {/* OPTIONS */}
//               <div className="options-grid">
//                 <p>A. {q.option_a}</p>
//                 <p>B. {q.option_b}</p>
//                 <p>C. {q.option_c}</p>
//                 <p>D. {q.option_d}</p>
//               </div>

//               {/* ANSWER */}
//               <div className="correct-answer">
//                 ✔ Correct Answer: <span>{q.correct_option}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "../../styles/faculty/QuestionsList.css";
import { useNavigate } from "react-router-dom";

export default function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [markFilter, setMarkFilter] = useState("all");
  const navigate = useNavigate();

  const faculty = JSON.parse(localStorage.getItem("user"));
  const facultyId = faculty?.id;

  useEffect(() => {
    if (!facultyId) {
      alert("Faculty not logged in");
      return;
    }
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions`, {
        headers: {
          "x-faculty-id": facultyId,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch questions");

      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load questions");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${id}`,
        {
          method: "DELETE",
          headers: {
            "x-faculty-id": facultyId,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      fetchQuestions();
    } catch {
      alert("Failed to delete question");
    }
  };

  const filtered = questions.filter((q) => {
    const matchSearch = q.question
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMarks =
      markFilter === "all" || q.marks === Number(markFilter);

    return matchSearch && matchMarks;
  });

  const grouped = filtered.reduce((acc, q) => {
    acc[q.marks] = acc[q.marks] || [];
    acc[q.marks].push(q);
    return acc;
  }, {});

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2>Questions Pool</h2>

        <div className="questions-controls">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={markFilter}
            onChange={(e) => setMarkFilter(e.target.value)}
          >
            <option value="all">All Marks</option>
            <option value="1">1 Mark</option>
            <option value="2">2 Marks</option>
            <option value="5">5 Marks</option>
          </select>

          <button
            className="add-question-btn"
            onClick={() => navigate("/faculty/add-question")}
          >
            + Add Question
          </button>
        </div>
      </div>

      {Object.entries(grouped).length === 0 && (
        <p style={{ marginTop: 20 }}>No questions found.</p>
      )}

      {Object.entries(grouped).map(([marks, qs]) => (
        <div key={marks} className="marks-block">
          <h3>{marks} Mark Questions</h3>

          {qs.map((q, index) => (
            <div key={q.id} className="question-card">
              <div className="question-row">
                <div className="question-text">
                  <strong>Q{index + 1}.</strong> {q.question}
                </div>

                <div className="question-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/faculty/edit-question/${q.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="options-grid">
                <p>A. {q.option_a}</p>
                <p>B. {q.option_b}</p>
                <p>C. {q.option_c}</p>
                <p>D. {q.option_d}</p>
              </div>

              <div className="correct-answer">
                ✔ Correct Answer: <span>{q.correct_option}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
