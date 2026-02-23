import React from "react";
import { useExamFlow } from "../../context/ExamFlowContext";

import ExamInstructions from "./ExamInstructions";
import PreCheck from "./PreCheck";
// PreCheck will be created next
import ExamAttempt from "./ExamAttempt";
// ExamSubmitted later

export default function ExamFlowPage() {
  const { step } = useExamFlow();

  if (step === "INSTRUCTIONS") {
    return <ExamInstructions />;
  }

 if (step === "PRECHECK") return <PreCheck />;

  if (step === "ATTEMPT") {
    return <ExamAttempt />;
  }

  if (step === "SUBMITTED") {
    return <div>Exam Submitted</div>;
  }

  return <div>Invalid Exam Flow</div>;
}
