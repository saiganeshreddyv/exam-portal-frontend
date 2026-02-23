// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "../../styles/student/ExamAttempt.css";
// import { useExamFlow } from "../../context/ExamFlowContext";

// export default function ExamAttempt() {
//   const { attemptId, cameraStream } = useExamFlow();
//   const videoRef = useRef(null);

//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const [answers, setAnswers] = useState({});
//   const [visited, setVisited] = useState(new Set());

//   /* 🔴 FULLSCREEN + PROCTORING STATES */
//   const [violation, setViolation] = useState(false);
//   const [fullscreenEnabled, setFullscreenEnabled] = useState(
//     !!document.fullscreenElement
//   );

// //   /* ================= CAMERA (LIVE FEED FIX) ================= */
// //   useEffect(() => {
// //   if (!cameraStream || !videoRef.current) return;

// //   const video = videoRef.current;

// //   // Re-attach stream safely
// //   video.srcObject = cameraStream;

// //   // Force play (important for Chrome / Edge)
// //   const playVideo = async () => {
// //     try {
// //       await video.play();
// //     } catch (err) {
// //       console.warn("Video play blocked, retrying...", err);
// //     }
// //   };

// //   playVideo();

// //   // Re-play on fullscreen change (VERY IMPORTANT)
// //   const reattachOnFullscreen = () => {
// //     video.srcObject = cameraStream;
// //     playVideo();
// //   };

// //   document.addEventListener("fullscreenchange", reattachOnFullscreen);

// //   return () => {
// //     document.removeEventListener(
// //       "fullscreenchange",
// //       reattachOnFullscreen
// //     );
// //   };
// // }, [cameraStream]);
// useEffect(() => {
//   if (cameraStream && videoRef.current) {
//     videoRef.current.srcObject = cameraStream;
//   }
// }, [cameraStream]);


// console.log("Camera active:", cameraStream?.active);

//   /* ================= FULLSCREEN CHANGE ================= */
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       if (!document.fullscreenElement) {
//         setViolation(true);
//         setFullscreenEnabled(false);
//       } else {
//         setFullscreenEnabled(true);
//       }
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () =>
//       document.removeEventListener(
//         "fullscreenchange",
//         handleFullscreenChange
//       );
//   }, []);

//   /* ================= TAB SWITCH ================= */
//   useEffect(() => {
//     const handleVisibility = () => {
//       if (document.hidden && !violation) {
//         setViolation(true);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     return () =>
//       document.removeEventListener(
//         "visibilitychange",
//         handleVisibility
//       );
//   }, [violation]);

//   /* ================= RE-ENTER FULLSCREEN ================= */
//   const handleReEnterFullscreen = async () => {
//     try {
//       await document.documentElement.requestFullscreen();
//       setViolation(false);
//       setFullscreenEnabled(true);
//     } catch (err) {
//       console.error("Fullscreen error", err);
//     }
//   };

//   /* ================= FETCH QUESTIONS ================= */
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         `http://localhost:5000/api/exam-attempts/${attemptId}/questions`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setQuestions(res.data.questions);
//       setTimeLeft(res.data.duration * 60);
//       setVisited(new Set([0]));
//       setLoading(false);
//     };

//     fetchQuestions();
//   }, [attemptId]);

//   /* ================= TIMER ================= */
//   useEffect(() => {
//     if (!timeLeft) return;

//     const timer = setInterval(() => {
//       setTimeLeft((t) => (t > 0 ? t - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
//   const ss = String(timeLeft % 60).padStart(2, "0");

//   /* ================= HELPERS ================= */
//   const markVisited = (i) =>
//     setVisited((prev) => new Set(prev).add(i));

//   const nextQuestion = () => {
//     markVisited(current);
//     setCurrent(current === questions.length - 1 ? 0 : current + 1);
//   };

//   const prevQuestion = () => {
//     markVisited(current);
//     setCurrent(current === 0 ? questions.length - 1 : current - 1);
//   };

//   const goToQuestion = (i) => {
//     markVisited(current);
//     setCurrent(i);
//   };

//   const getPaletteClass = (i) => {
//     if (i === current) return "palette-btn current";
//     if (answers[i]) return "palette-btn answered";
//     if (visited.has(i)) return "palette-btn visited";
//     return "palette-btn";
//   };

//   if (loading) return <p>Loading exam...</p>;

//   return (
//     <div className="exam-root">
//       {/* TOP BAR */}
//       <div className="exam-top-bar">
//         <span>Exam</span>
//         <span className="exam-timer">⏱ {mm}:{ss}</span>
//         <button className="finish-btn">Submit</button>
//       </div>

//       {/* LEFT PANEL */}
//       <div className="exam-left-panel">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           className="exam-camera-preview"
//         />

//         <div className="palette">
//           {questions.map((_, i) => (
//             <button
//               key={i}
//               className={getPaletteClass(i)}
//               onClick={() => goToQuestion(i)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="exam-content">
//         <h4>
//           Question {current + 1} of {questions.length}
//         </h4>

//         <div className="question-box">
//           <h2>{questions[current].question}</h2>
//         </div>

//         <div className="options">
//           {questions[current].options.map((opt, i) => {
//             const label = String.fromCharCode(65 + i);

//             return (
//               <label
//                 key={i}
//                 className={`classic-option ${
//                   answers[current] === opt ? "selected" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name={`q-${current}`}
//                   checked={answers[current] === opt}
//                   onChange={() =>
//                     setAnswers((prev) => ({
//                       ...prev,
//                       [current]: opt,
//                     }))
//                   }
//                 />
//                 <span className="option-badge">{label}</span>
//                 <span className="option-text">{opt}</span>
//               </label>
//             );
//           })}
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="exam-bottom-bar">
//         <button className="prev-btn" onClick={prevQuestion}>
//           Previous
//         </button>
//         <button className="next-btn" onClick={nextQuestion}>
//           Next
//         </button>
//       </div>

//       {/* 🔴 VIOLATION OVERLAY (LIKE PRECHECK) */}
//       {violation && (
//         <div className="violation-overlay">
//           <div className="violation-modal">
//             <h2>⚠️ Exam Rule Violation</h2>
//             <p>
//               You exited fullscreen or switched tabs.
//               This action is not allowed during the exam.
//             </p>
//             <button onClick={handleReEnterFullscreen}>
//               Re-enter Fullscreen
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/student/ExamAttempt.css";
import { useExamFlow } from "../../context/ExamFlowContext";
import { useCamera } from "../../hooks/usecamera";
import { useNavigate } from "react-router-dom";

export default function ExamAttempt() {
  const { attemptId } = useExamFlow();

    const navigate = useNavigate();
  /* ================= CAMERA (HOOK) ================= */
  const {
    videoRef,
    startCamera,
    stopCamera,
    active: cameraActive,
  } = useCamera();

  /* ================= STATE ================= */
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));

  /* ================= PROCTORING ================= */
  const [violation, setViolation] = useState(false);

  const [malpracticeCount, setMalpracticeCount] = useState(0);
  const currentQuestion = questions[current];

  /* ================= START CAMERA ONCE ================= */
  useEffect(() => {
    startCamera(); // 🔴 CAMERA STARTS HERE
  }, []);

  /* ================= FULLSCREEN DETECTION ================= */
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setViolation(true);
        setMalpracticeCount((c) => c + 1);
      }
    };

    const onTabChange = () => {
      if (document.hidden) {
        setViolation(true);
        setMalpracticeCount((c) => c + 1);
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("visibilitychange", onTabChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("visibilitychange", onTabChange);
    };
  }, []);

  const reEnterFullscreen = async () => {
    await document.documentElement.requestFullscreen();
    setViolation(false);
  };

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/exam-attempts/${attemptId}/questions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestions(res.data.questions);
      setTimeLeft(res.data.duration * 60);
      setLoading(false);
    };

    fetchQuestions();
  }, [attemptId]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  /* ================= NAVIGATION ================= */
  const markVisited = (i) =>
    setVisited((prev) => new Set(prev).add(i));

  const nextQuestion = () => {
    markVisited(current);
    setCurrent(current === questions.length - 1 ? 0 : current + 1);
  };

  const prevQuestion = () => {
    markVisited(current);
    setCurrent(current === 0 ? questions.length - 1 : current - 1);
  };

  const jumpTo = (i) => {
    markVisited(current);
    setCurrent(i);
  };

  const paletteClass = (i) => {
    if (i === current) return "palette-btn current";
    if (answers[questions[i].id]) return "palette-btn answered";
    if (visited.has(i)) return "palette-btn visited";
    return "palette-btn";
  };

  const submitExam = async () => {
  const token = localStorage.getItem("token");

  await axios.post(
    `http://localhost:5000/api/exam-attempts/${attemptId}/submit`,
    { answers,
        malpracticeCount: malpracticeCount,
     },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  stopCamera();
  navigate("/student/exam-submitted");
};



  if (loading) return <p>Loading exam...</p>;

  return (
    <div className="exam-root">
      {/* TOP BAR */}
      <div className="exam-top-bar">
        <span>Exam</span>
        <span className="exam-timer">⏱ {mm}:{ss}</span>
        <button className="finish-btn" onClick={submitExam}>
          Submit
        </button>
      </div>

      {/* LEFT PANEL */}
      <div className="exam-left-panel">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="exam-camera-preview"
        />

        <div className="palette">
          {questions.map((_, i) => (
            <button
              key={i}
              className={paletteClass(i)}
              onClick={() => jumpTo(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="exam-content">
        <h4>
          Question {current + 1} of {questions.length}
        </h4>

        <div className="question-box">
          <h2>{questions[current].question}</h2>
        </div>

        <div className="options">
  {["A", "B", "C", "D"].map((label, i) => {
    const optionText = currentQuestion.options[i];

    return (
      <label
        key={label}
        className={`classic-option ${
          answers[currentQuestion.id] === label ? "selected" : ""
        }`}
      >
        <input
          type="radio"
          name={`q-${currentQuestion.id}`}
          checked={answers[currentQuestion.id] === label}
          onChange={() =>
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: label, // ✅ QUESTION ID → OPTION LETTER
            }))
          }
        />
        <span className="option-badge">{label}</span>
        <span className="option-text">{optionText}</span>
      </label>
    );
  })}
</div>

      </div>

      {/* BOTTOM BAR */}
      <div className="exam-bottom-bar">
        <button className="prev-btn" onClick={prevQuestion}>
          Previous
        </button>
        <button className="next-btn" onClick={nextQuestion}>
          Next
        </button>
      </div>

      {/* VIOLATION OVERLAY */}
      {violation && (
        <div className="violation-overlay">
          <div className="violation-modal">
            <h2>⚠️ Rule Violation</h2>
            <p>You exited fullscreen or switched tabs.</p>
            <button onClick={reEnterFullscreen}>
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
