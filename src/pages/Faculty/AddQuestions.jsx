
import React, { useState } from "react";
import "../../styles/faculty/AddQuestions.css";

export default function AddQuestion() {
  const faculty = JSON.parse(localStorage.getItem("user"));

  /* ================= MANUAL QUESTION ================= */
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState(1);

  /* ================= PDF FLOW ================= */
  const [questionPdf, setQuestionPdf] = useState(null);
  const [answerKeyPdf, setAnswerKeyPdf] = useState(null);
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [savingBulk, setSavingBulk] = useState(false);

  /* ================= MANUAL SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question || !correctOption) {
      alert("Question and correct option are required");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-faculty-id": faculty?.id,
        },
        body: JSON.stringify({
          question,
          optionA: options.A,
          optionB: options.B,
          optionC: options.C,
          optionD: options.D,
          correctOption,
          marks,
        }),
      });

      if (!res.ok) throw new Error();

      alert("Question saved successfully");
      resetManualForm();
    } catch {
      alert("Failed to save question");
    }
  };

  const resetManualForm = () => {
    setQuestion("");
    setOptions({ A: "", B: "", C: "", D: "" });
    setCorrectOption("");
    setMarks(1);
  };

  /* ================= PDF EXTRACT ================= */
  const handlePdfUpload = async () => {
    if (!questionPdf) {
      alert("Please select Question PDF");
      return;
    }

    const formData = new FormData();
    formData.append("questionPdf", questionPdf);
    if (answerKeyPdf) formData.append("answerKeyPdf", answerKeyPdf);

    try {
      setExtracting(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/extract-pdf`,
        {
          method: "POST",
          headers: {
            "x-faculty-id": faculty?.id,
          },
          body: formData,
        }
      );

      const data = await res.json();

      const prepared = (data.questions || []).map((q) => ({
        ...q,
        marks: 1,
        autoDetected: Boolean(q.correctOption),
      }));

      setExtractedQuestions(prepared);
    } catch {
      alert("Failed to extract PDF");
    } finally {
      setExtracting(false);
    }
  };

  /* ================= SAVE ALL ================= */
  const saveAllExtracted = async () => {
    if (extractedQuestions.some((q) => !q.correctOption)) {
      alert("Some questions are missing correct answers");
      return;
    }

    try {
      setSavingBulk(true);

      const payload = extractedQuestions.map((q) => ({
        question: q.question,
        optionA: q.options.A,
        optionB: q.options.B,
        optionC: q.options.C,
        optionD: q.options.D,
        correctOption: q.correctOption,
        marks: q.marks,
      }));

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-faculty-id": faculty?.id,
          },
          body: JSON.stringify({ questions: payload }),
        }
      );

      if (!res.ok) throw new Error();

      alert("All questions saved successfully");
      setExtractedQuestions([]);
      setQuestionPdf(null);
      setAnswerKeyPdf(null);
    } catch {
      alert("Failed to save extracted questions");
    } finally {
      setSavingBulk(false);
    }
  };

  return (
    <div className="add-question-page">
      <div className="add-question-card">
        <h2>Add Question</h2>

        {/* ================= MANUAL ================= */}
        <form onSubmit={handleSubmit}>
          <label>Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className="options-grid">
            {["A", "B", "C", "D"].map((opt) => (
              <input
                key={opt}
                placeholder={`Option ${opt}`}
                value={options[opt]}
                onChange={(e) =>
                  setOptions({ ...options, [opt]: e.target.value })
                }
              />
            ))}
          </div>

          <select
            value={correctOption}
            className={correctOption ? "correct-selected" : ""}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            <option value="">Correct Option</option>
            {["A", "B", "C", "D"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={marks}
            onChange={(e) => setMarks(+e.target.value)}
          />

          <button type="submit" className="primary">
            Save Question
          </button>
        </form>

        <hr className="divider" />

        {/* ================= PDF UPLOAD ================= */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setQuestionPdf(e.target.files[0])}
        />
        <input
          type="file"
          accept=".txt,.csv"
          onChange={(e) => setAnswerKeyPdf(e.target.files[0])}
        />

        <button onClick={handlePdfUpload} disabled={extracting}>
          {extracting ? "Extracting..." : "Upload & Extract"}
        </button>

        {/* ================= PREVIEW ================= */}
        {extractedQuestions.length > 0 && (
          <div className="pdf-preview">
            <h4>Extracted Questions ({extractedQuestions.length})</h4>

            {extractedQuestions.map((q, index) => (
              <div key={index} className="preview-card">
                <strong>Q{index + 1}</strong>

                <textarea
                  value={q.question}
                  onChange={(e) => {
                    const copy = [...extractedQuestions];
                    copy[index] = { ...copy[index], question: e.target.value };
                    setExtractedQuestions(copy);
                  }}
                />

                <ul>
                  {["A", "B", "C", "D"].map((opt) => (
                    <li key={opt}>
                      <input
                        type="text"
                        value={q.options[opt]}
                        onChange={(e) => {
                          const copy = [...extractedQuestions];
                          copy[index] = {
                            ...copy[index],
                            options: {
                              ...copy[index].options,
                              [opt]: e.target.value,
                            },
                          };
                          setExtractedQuestions(copy);
                        }}
                        className={
                          q.correctOption === opt ? "correct" : ""
                        }
                        placeholder={`Option ${opt}`}
                      />
                    </li>
                  ))}
                </ul>

                <div className="preview-controls">
                  <select
                    value={q.correctOption || ""}
                    className={q.correctOption ? "correct-selected" : ""}
                    onChange={(e) => {
                      const copy = [...extractedQuestions];
                      copy[index] = {
                        ...copy[index],
                        correctOption: e.target.value,
                      };
                      setExtractedQuestions(copy);
                    }}
                  >
                    <option value="">Correct Option</option>
                    {["A", "B", "C", "D"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={q.marks}
                    onChange={(e) => {
                      const copy = [...extractedQuestions];
                      copy[index] = {
                        ...copy[index],
                        marks: +e.target.value,
                      };
                      setExtractedQuestions(copy);
                    }}
                  />

                  {q.autoDetected && (
                    <span className="auto-tag">Auto-detected</span>
                  )}
                </div>
              </div>
            ))}

            <button onClick={saveAllExtracted} disabled={savingBulk}>
              {savingBulk ? "Saving..." : "Confirm & Save All"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
