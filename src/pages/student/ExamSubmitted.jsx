import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/student/ExamSubmitted.css";

export default function ExamSubmitted() {
  const navigate = useNavigate();

  /* EXIT FULLSCREEN SAFELY */
  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  return (
    <div className="submitted-root">
      <div className="submitted-card">
        <div className="checkmark-wrapper">
          <div className="checkmark">✓</div>
        </div>

        <h1>Exam Submitted</h1>
        <p>
          Your responses have been recorded successfully.
          <br />
          Results will be available once published by faculty.
        </p>

        <div className="submitted-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/student/dashboard")}
          >
            Go to Home
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/student/exams")}
          >
            View Exams
          </button>
        </div>
      </div>
    </div>
  );
}
