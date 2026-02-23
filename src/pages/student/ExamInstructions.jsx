import React from "react";
import "../../styles/student/ExamInstructions.css";
import { useExamFlow } from "../../context/ExamFlowContext"; // ✅ THIS WAS MISSING

export default function ExamInstructions() {
  const { selectedExam, goTo } = useExamFlow();

  if (!selectedExam) {
    return <p>Invalid exam session. Please go back.</p>;
  }

  return (
    <div className="instructionsPage">
      <div className="instructionsContainer">
        <h1 className="instructionsTitle">Exam Instructions</h1>

        <div className="examMeta">
          <p>
            <strong>Exam Name:</strong> {selectedExam.title}
          </p>
          <p>
            <strong>Duration:</strong> {selectedExam.duration} minutes
          </p>
        </div>

        <div className="rulesSection">
          <h3>General Instructions</h3>
          <ol>
            <li>This is a time-bound online examination.</li>
            <li>The exam will auto-submit when the timer ends.</li>
            <li>Re-attempting the exam is not allowed.</li>
          </ol>

          <h3>System Rules</h3>
          <ol>
            <li>Camera access is mandatory throughout the exam.</li>
            <li>Fullscreen mode is compulsory.</li>
            <li>Tab switching or minimizing the window is prohibited.</li>
            <li>Refreshing the page may terminate the exam.</li>
          </ol>

          <h3>Malpractice Policy</h3>
          <ol>
            <li>Any suspicious activity will be monitored.</li>
            <li>Multiple violations may lead to auto-submission.</li>
          </ol>
        </div>

        <button
          className="continueBtn"
          onClick={() => goTo("PRECHECK")}
        >
          Proceed to Verification
        </button>
      </div>
    </div>
  );
}
