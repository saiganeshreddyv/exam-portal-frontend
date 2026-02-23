// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import "../../styles/faculty/CreateExam.css";

// // // export default function CreateExam() {
// // //   const [formData, setFormData] = useState({
// // //     title: "",
// // //     description: "",
// // //     date: "",
// // //     duration: "",
// // //     total_marks: "",
// // //   });
// // //   const [message, setMessage] = useState("");

// // //   const handleChange = (e) =>
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const faculty = JSON.parse(localStorage.getItem("faculty"));
// // //       await axios.post("http://localhost:5000/api/faculty/exams", {
// // //         ...formData,
// // //         faculty_id: faculty.id,
// // //       });

// // //       setMessage("✅ Exam created successfully!");
// // //       setFormData({
// // //         title: "",
// // //         description: "",
// // //         date: "",
// // //         duration: "",
// // //         total_marks: "",
// // //       });
// // //     } catch (err) {
// // //       setMessage("❌ Failed to create exam. Try again.");
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div className="create-exam">
// // //         <h2>📝 Create Exam</h2>

// // //         <form onSubmit={handleSubmit}>
// // //           <input
// // //             name="title"
// // //             placeholder="Exam Title"
// // //             value={formData.title}
// // //             onChange={handleChange}
// // //             required
// // //           />

// // //           <textarea
// // //             name="description"
// // //             placeholder="Description"
// // //             value={formData.description}
// // //             onChange={handleChange}
// // //             required
// // //           />

// // //           <input
// // //             name="date"
// // //             type="date"
// // //             value={formData.date}
// // //             onChange={handleChange}
// // //             required
// // //           />

// // //           <input
// // //             name="duration"
// // //             type="number"
// // //             placeholder="Duration (minutes)"
// // //             value={formData.duration}
// // //             onChange={handleChange}
// // //             required
// // //           />

// // //           <input
// // //             name="total_marks"
// // //             type="number"
// // //             placeholder="Total Marks"
// // //             value={formData.total_marks}
// // //             onChange={handleChange}
// // //             required
// // //           />

// // //           <button type="submit">Create Exam</button>
// // //         </form>

// // //         {message && <p className="msg">{message}</p>}
// // //       </div>
// // //     </>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../../styles/faculty/CreateExam.css";

// // export default function CreateExam() {
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     date: "",
// //     duration: "",
// //     total_marks: "",
// //   });

// //   const [questions, setQuestions] = useState([]);
// //   const [selectedQuestions, setSelectedQuestions] = useState([]);
// //   const [message, setMessage] = useState("");

// //   /* ================= FETCH QUESTION POOL ================= */
// //   useEffect(() => {
// //     fetchQuestions();
// //   }, []);

// //   const fetchQuestions = async () => {
// //   try {
// //     const faculty = JSON.parse(localStorage.getItem("user"));

// //     if (!faculty?.id) return;

// //     const res = await axios.get("http://localhost:5000/api/questions", {
// //       headers: {
// //         "x-faculty-id": faculty.id,
// //       },
// //     });

// //     setQuestions(res.data.questions || res.data);
// //   } catch (err) {
// //     console.error("❌ Failed to load questions", err);
// //   }
// // };



// //   /* ================= FORM HANDLERS ================= */
// //   const handleChange = (e) =>
// //     setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const toggleQuestion = (id) => {
// //     setSelectedQuestions((prev) =>
// //       prev.includes(id)
// //         ? prev.filter((qId) => qId !== id)
// //         : [...prev, id]
// //     );
// //   };

// //   /* ================= SUBMIT ================= */
// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setMessage("");

// //   if (selectedQuestions.length === 0) {
// //     setMessage("❌ Please select at least one question.");
// //     return;
// //   }

// //   const faculty = JSON.parse(localStorage.getItem("user"));

// //   if (!faculty || !faculty.id) {
// //     setMessage("❌ Faculty not logged in. Please login again.");
// //     return;
// //   }

// //   try {
// //     // 1️⃣ CREATE EXAM
// //     const examRes = await axios.post(
// //   "http://localhost:5000/api/faculty/exams",
// //   {
// //     ...formData,
// //   },
// //   {
// //     headers: {
// //       "x-faculty-id": faculty.id,   // ✅ REQUIRED
// //     },
// //   }
// // );

// // // ✅ BACKEND RETURNS FULL EXAM OBJECT
// // const examId = examRes.data.id;


// //     // 2️⃣ LINK QUESTIONS
// //     await axios.post(
// //       `http://localhost:5000/api/faculty/exams/${examId}/questions`,
// //       {
// //         questionIds: selectedQuestions,
// //       },
// //       {
// //         headers: {
// //           "x-faculty-id": faculty.id,
// //         },
// //       }
// //     );

// //     setMessage("✅ Exam created with selected questions!");

// //     setFormData({
// //       title: "",
// //       description: "",
// //       date: "",
// //       duration: "",
// //       total_marks: "",
// //     });
// //     setSelectedQuestions([]);

// //   } catch (err) {
// //     console.error("❌ Exam creation error:", err);
// //     setMessage("❌ Failed to create exam.");
// //   }
// // };


// //   return (
// //     <div className="create-exam">
// //       <h2>Create Exam</h2>

// //       <form onSubmit={handleSubmit} className="exam-form">
// //         <input
// //           name="title"
// //           placeholder="Exam Title"
// //           value={formData.title}
// //           onChange={handleChange}
// //           required
// //         />

// //         <textarea
// //           name="description"
// //           placeholder="Description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           name="date"
// //           type="date"
// //           value={formData.date}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           name="duration"
// //           type="number"
// //           placeholder="Duration (minutes)"
// //           value={formData.duration}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           name="total_marks"
// //           type="number"
// //           placeholder="Total Marks"
// //           value={formData.total_marks}
// //           onChange={handleChange}
// //           required
// //         />

// //         {/* ================= QUESTION POOL ================= */}
// //         <div className="question-pool">
// //           <h3>Select Questions</h3>

// //           {questions.length === 0 && (
// //             <p className="empty-text">No questions available</p>
// //           )}

// //           {questions.map((q) => (
// //             <label key={q.id} className="question-item">
// //               <input
// //                 type="checkbox"
// //                 checked={selectedQuestions.includes(q.id)}
// //                 onChange={() => toggleQuestion(q.id)}
// //               />
// //               <div className="question-info">
// //                 <span className="question-text">{q.question}</span>
// //                 <span className="question-marks">{q.marks} Marks</span>
// //               </div>
// //             </label>
// //           ))}
// //         </div>

// //         <button type="submit" className="create-btn">
// //           Create Exam
// //         </button>
// //       </form>

// //       {message && <p className="msg">{message}</p>}
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../../styles/faculty/CreateExam.css";

// export default function CreateExam() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     duration: "",
//     total_marks: "",
//     camera_required: true,
//     fullscreen_required: true,
//     max_malpractice_limit: 3,
//   });

//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [message, setMessage] = useState("");

//   /* ================= FETCH QUESTION POOL ================= */
//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const faculty = JSON.parse(localStorage.getItem("user"));
//       if (!faculty?.id) return;

//       const res = await axios.get("http://localhost:5000/api/questions", {
//         headers: {
//           "x-faculty-id": faculty.id,
//         },
//       });

//       setQuestions(res.data.questions || res.data);
//     } catch (err) {
//       console.error("❌ Failed to load questions", err);
//     }
//   };

//   /* ================= FORM HANDLERS ================= */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const toggleQuestion = (id) => {
//     setSelectedQuestions((prev) =>
//       prev.includes(id)
//         ? prev.filter((qId) => qId !== id)
//         : [...prev, id]
//     );
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     if (selectedQuestions.length === 0) {
//       setMessage("❌ Please select at least one question.");
//       return;
//     }

//     const faculty = JSON.parse(localStorage.getItem("user"));

//     if (!faculty || !faculty.id) {
//       setMessage("❌ Faculty not logged in. Please login again.");
//       return;
//     }

//     try {
//       // 1️⃣ CREATE EXAM
//       const examRes = await axios.post(
//         "http://localhost:5000/api/faculty/exams",
//         {
//           ...formData,
//           duration: Number(formData.duration),
//           total_marks: Number(formData.total_marks),
//           max_malpractice_limit: Number(formData.max_malpractice_limit),
//         },
//         {
//           headers: {
//             "x-faculty-id": faculty.id,
//           },
//         }
//       );

//       const examId = examRes.data.id;

//       // 2️⃣ LINK QUESTIONS
//       await axios.post(
//         `http://localhost:5000/api/faculty/exams/${examId}/questions`,
//         {
//           questionIds: selectedQuestions,
//         },
//         {
//           headers: {
//             "x-faculty-id": faculty.id,
//           },
//         }
//       );

//       setMessage("✅ Exam created with selected questions!");

//       setFormData({
//         title: "",
//         description: "",
//         date: "",
//         duration: "",
//         total_marks: "",
//         camera_required: true,
//         fullscreen_required: true,
//         max_malpractice_limit: 3,
//       });

//       setSelectedQuestions([]);
//     } catch (err) {
//       console.error("❌ Exam creation error:", err);
//       setMessage("❌ Failed to create exam.");
//     }
//   };

//   return (
//     <div className="create-exam">
//       <h2>Create Exam</h2>

//       <form onSubmit={handleSubmit} className="exam-form">
//         <input
//           name="title"
//           placeholder="Exam Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="date"
//           type="date"
//           value={formData.date}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="duration"
//           type="number"
//           placeholder="Duration (minutes)"
//           value={formData.duration}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="total_marks"
//           type="number"
//           placeholder="Total Marks"
//           value={formData.total_marks}
//           onChange={handleChange}
//           required
//         />

//         {/* ================= PROCTORING RULES ================= */}
//         <div className="proctoring-section">
//           <h3>Security & Proctoring</h3>

//           <label className="checkbox-row">
//             <input
//               type="checkbox"
//               name="camera_required"
//               checked={formData.camera_required}
//               onChange={handleChange}
//             />
//             Enable Camera Monitoring
//           </label>

//           <label className="checkbox-row">
//             <input
//               type="checkbox"
//               name="fullscreen_required"
//               checked={formData.fullscreen_required}
//               onChange={handleChange}
//             />
//             Force Fullscreen Mode
//           </label>

//           <input
//             type="number"
//             name="max_malpractice_limit"
//             placeholder="Max Malpractice Warnings"
//             value={formData.max_malpractice_limit}
//             onChange={handleChange}
//             min="1"
//           />
//         </div>

//         {/* ================= QUESTION POOL ================= */}
//         <div className="question-pool">
//           <h3>Select Questions</h3>

//           {questions.length === 0 && (
//             <p className="empty-text">No questions available</p>
//           )}

//           {questions.map((q) => (
//             <label key={q.id} className="question-item">
//               <input
//                 type="checkbox"
//                 checked={selectedQuestions.includes(q.id)}
//                 onChange={() => toggleQuestion(q.id)}
//               />
//               <div className="question-info">
//                 <span className="question-text">{q.question}</span>
//                 <span className="question-marks">{q.marks} Marks</span>
//               </div>
//             </label>
//           ))}
//         </div>

//         <button type="submit" className="create-btn">
//           Create Exam
//         </button>
//       </form>

//       {message && <p className="msg">{message}</p>}
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "../../styles/faculty/CreateExam.css";

export default function CreateExam() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    total_marks: "",
    camera_required: true,
    fullscreen_required: true,
    max_malpractice_limit: 3,
  });

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Added for the search-bar CSS
  const [message, setMessage] = useState({ text: "", type: "" });

  /* ================= FETCH QUESTION POOL ================= */
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const faculty = JSON.parse(localStorage.getItem("user"));
      if (!faculty?.id) return;

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions`, {
        headers: { "x-faculty-id": faculty.id },
      });

      setQuestions(res.data.questions || res.data);
    } catch (err) {
      console.error("❌ Failed to load questions", err);
    }
  };

  /* ================= CALCULATIONS ================= */
  const currentSelectionStats = useMemo(() => {
    const selected = questions.filter((q) => selectedQuestions.includes(q.id));
    const totalMarks = selected.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);
    return { count: selected.length, marks: totalMarks };
  }, [selectedQuestions, questions]);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleQuestion = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setMessage({ text: "", type: "" });

    if (selectedQuestions.length === 0) {
      setMessage({ text: "Please select at least one question.", type: "error" });
      return;
    }

    const faculty = JSON.parse(localStorage.getItem("user"));
    if (!faculty?.id) {
      setMessage({ text: "Faculty not logged in.", type: "error" });
      return;
    }

    try {
      const examRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faculty/exams`,
        {
          ...formData,
          duration: Number(formData.duration),
          total_marks: Number(formData.total_marks),
          max_malpractice_limit: Number(formData.max_malpractice_limit),
          faculty_id: faculty.id
        },
        { headers: { "x-faculty-id": faculty.id } }
      );

      const examId = examRes.data.id || examRes.data.exam.id;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faculty/exams/${examId}/questions`,
        { questionIds: selectedQuestions },
        { headers: { "x-faculty-id": faculty.id } }
      );

      setMessage({ text: "Exam published successfully!", type: "success" });
      setFormData({
        title: "", description: "", date: "", duration: "", total_marks: "",
        camera_required: true, fullscreen_required: true, max_malpractice_limit: 3,
      });
      setSelectedQuestions([]);
    } catch (err) {
      setMessage({ text: "Failed to create exam.", type: "error" });
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="exam-builder-container">
      {/* --- Header Section --- */}
      <header className="builder-header">
        <div className="header-left">
          <h1>Create New Assessment</h1>
          <p>Configure exam rules and select questions from your pool.</p>
        </div>
        <div className="header-actions">
          <div className="live-stats">
            <span>Selected: <strong>{currentSelectionStats.count}</strong></span>
            <span>Weight: <strong>{currentSelectionStats.marks}/{formData.total_marks || 0}</strong></span>
          </div>
          <button onClick={handleSubmit} className="publish-btn">Publish Exam</button>
        </div>
      </header>

      {message.text && (
        <div className={`alert-banner ${message.type}`}>{message.text}</div>
      )}

      <main className="builder-grid">
        {/* --- Left Column: Configuration --- */}
        <section className="config-panel">
          <div className="card">
            <h3>General Information</h3>
            <div className="input-group">
              <label>Exam Title</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Midterm Data Structures" required />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required />
            </div>
            <div className="row">
              <div className="input-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Duration (Min)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label>Total Marks Target</label>
              <input type="number" name="total_marks" value={formData.total_marks} onChange={handleChange} required />
            </div>
          </div>

          <div className="card">
            <h3>Security & Proctoring</h3>
            <div className="switch-group">
              <label className="switch">
                <input type="checkbox" name="camera_required" checked={formData.camera_required} onChange={handleChange} />
                <span className="slider"></span>
              </label>
              <span>Enable AI Camera Monitoring</span>
            </div>
            <div className="switch-group">
              <label className="switch">
                <input type="checkbox" name="fullscreen_required" checked={formData.fullscreen_required} onChange={handleChange} />
                <span className="slider"></span>
              </label>
              <span>Force Browser Fullscreen</span>
            </div>
            <div className="input-group mt-10">
              <label>Malpractice Warning Limit</label>
              <input type="number" name="max_malpractice_limit" value={formData.max_malpractice_limit} onChange={handleChange} min="1" />
            </div>
          </div>
        </section>

        {/* --- Right Column: Question Pool --- */}
        <section className="pool-panel">
          <div className="pool-header">
            <h3>Question Bank</h3>
            <input 
              type="text" 
              placeholder="Search questions..." 
              className="search-bar"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="question-list">
            {filteredQuestions.length === 0 && <p className="empty-text">No questions found</p>}
            {filteredQuestions.map((q) => (
              <div 
                key={q.id} 
                className={`q-item ${selectedQuestions.includes(q.id) ? 'selected' : ''}`}
                onClick={() => toggleQuestion(q.id)}
              >
                <div className="q-checkbox">
                  <input type="checkbox" checked={selectedQuestions.includes(q.id)} readOnly />
                </div>
                <div className="q-content">
                  <p>{q.question}</p>
                  <span className="q-tag">{q.marks} Marks</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}