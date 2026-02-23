import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../styles/student/PreCheck.css";
import { useExamFlow } from "../../context/ExamFlowContext";

export default function PreCheck() {
  const {
    selectedExam,
    goTo,
    setAttemptId,
    setCameraStream,
    stopCamera,
  } = useExamFlow();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);
  const [violation, setViolation] = useState(false);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  /* ================= SAFETY GUARD ================= */

  if (!selectedExam) {
    return (
      <div className="precheck-page">
        <p>Invalid exam session. Please return to the exam list.</p>
      </div>
    );
  }

  /* ================= CAMERA ================= */

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      setCameraStream(stream);
      setCameraAllowed(true);
    } catch (err) {
      console.error(err);
      setError("Camera permission is required to continue.");
    }
  };

  /* ================= FULLSCREEN ================= */

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (err) {
      console.error(err);
      setError("Failed to enter fullscreen.");
    }
  };

  /* ================= FULLSCREEN EXIT (ESC) ================= */

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (cameraAllowed) {
          setViolation(true);
          setFullscreenEnabled(false);
        }
      } else {
        setFullscreenEnabled(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [cameraAllowed]);

  /* ================= TAB SWITCH DETECTION ================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !violation) {
        setViolation(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [violation]);

  /* ================= RE-ENTER FULLSCREEN ================= */

  const handleReEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setFullscreenEnabled(true);
      setViolation(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= START EXAM ================= */

  const startExam = async () => {
    if (!cameraAllowed || !fullscreenEnabled) return;

    try {
      setStarting(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/exam-attempts/start`,
        { exam_id: selectedExam.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAttemptId(res.data.attempt_id);
      goTo("ATTEMPT");
    } catch (err) {
      console.error(err);
      setError("Failed to start exam.");
      setStarting(false);
    }
  };

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      if (!starting) {
        stopCamera();
      }
    };
  }, [starting, stopCamera]);

  /* ================= UI ================= */

  return (
    <div className="precheck-page">
      <h2 className="precheck-title">System Verification</h2>

      <div className="precheck-box">
        {/* CAMERA SECTION */}
        <div className="precheck-section">
          <h3>Camera Verification</h3>

          {!cameraAllowed ? (
            <button className="precheck-btn" onClick={requestCamera}>
              Allow Camera
            </button>
          ) : (
            <p className="success-text">✅ Camera Verified</p>
          )}

          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="camera-preview"
          />
        </div>

        {/* FULLSCREEN SECTION */}
        <div className="precheck-section">
          <h3>Fullscreen Verification</h3>

          {!fullscreenEnabled ? (
            <button className="precheck-btn" onClick={enterFullscreen}>
              Enter Fullscreen
            </button>
          ) : (
            <p className="success-text">✅ Fullscreen Enabled</p>
          )}
        </div>

        {/* ERROR */}
        {error && <p className="error-text">{error}</p>}

        {/* START EXAM */}
        <button
          className="start-exam-btn"
          disabled={!cameraAllowed || !fullscreenEnabled || starting}
          onClick={startExam}
        >
          {starting ? "Starting Exam..." : "Start Exam"}
        </button>
      </div>

      {/* ================= VIOLATION OVERLAY ================= */}
      {violation && (
        <div className="violation-overlay">
          <div className="violation-modal">
            <h2>⚠️ Exam Rule Violation</h2>
            <p>
              You exited fullscreen or switched tabs.
              This action is not allowed during the exam.
            </p>
            <button onClick={handleReEnterFullscreen}>
              Re-enter Fullscreen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
