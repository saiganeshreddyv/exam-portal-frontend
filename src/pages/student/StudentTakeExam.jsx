import { useParams } from "react-router-dom";

export default function StudentTakeExam() {
  const { examId } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Exam ID: {examId}</h2>
      <p>This is the exam-taking screen (questions, timer, submit).</p>
    </div>
  );
}
