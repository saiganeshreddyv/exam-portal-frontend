// import React, { createContext, useContext, useState } from "react";

// const ExamFlowContext = createContext(null);

// export function ExamFlowProvider({ children }) {
//   const [step, setStep] = useState("INSTRUCTIONS");
//   // INSTRUCTIONS → PRECHECK → ATTEMPT → SUBMITTED

//   const [selectedExam, setSelectedExam] = useState(null);
//   const [attemptId, setAttemptId] = useState(null);
//   const [cameraStream, setCameraStream] = useState(null);

//   const goTo = (nextStep) => {
//     setStep(nextStep);
//   };

//   const resetFlow = () => {
//     setStep("INSTRUCTIONS");
//     setSelectedExam(null);
//     setAttemptId(null);
//   };

//   const stopCamera = () => {
//   if (cameraStream) {
//     cameraStream.getTracks().forEach(track => track.stop());
//     setCameraStream(null);
//   }
// };
//   return (
//     <ExamFlowContext.Provider
//       value={{
//   step,
//   goTo,
//   selectedExam,
//   setSelectedExam,
//   attemptId,
//   setAttemptId,
//   cameraStream,
//   setCameraStream,
//   stopCamera,
//   resetFlow,
// }}

//     >
//       {children}
//     </ExamFlowContext.Provider>
//   );
// }

// export function useExamFlow() {
//   const context = useContext(ExamFlowContext);
//   if (!context) {
//     throw new Error("useExamFlow must be used inside ExamFlowProvider");
//   }
//   return context;
// }
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const ExamFlowContext = createContext(null);

export function ExamFlowProvider({ children }) {
  // FLOW STEPS
  const [step, setStep] = useState("INSTRUCTIONS");
  // INSTRUCTIONS → PRECHECK → ATTEMPT → SUBMITTED

  // EXAM STATE
  const [selectedExam, setSelectedExam] = useState(null);
  const [attemptId, setAttemptId] = useState(null);

  // CAMERA
  const [cameraStream, setCameraStream] = useState(null);

  /* ================= FLOW ================= */

  const goTo = useCallback((nextStep) => {
    setStep(nextStep);
  }, []);

  const resetFlow = useCallback(() => {
    setStep("INSTRUCTIONS");
    setSelectedExam(null);
    setAttemptId(null);
  }, []);

  /* ================= CAMERA CONTROL ================= */

  const stopCamera = useCallback(() => {
    setCameraStream((stream) => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      return null;
    });
  }, []);

  return (
    <ExamFlowContext.Provider
      value={{
        step,
        goTo,
        selectedExam,
        setSelectedExam,
        attemptId,
        setAttemptId,
        cameraStream,
        setCameraStream,
        stopCamera,
        resetFlow,
      }}
    >
      {children}
    </ExamFlowContext.Provider>
  );
}

export function useExamFlow() {
  const context = useContext(ExamFlowContext);
  if (!context) {
    throw new Error("useExamFlow must be used inside ExamFlowProvider");
  }
  return context;
}
