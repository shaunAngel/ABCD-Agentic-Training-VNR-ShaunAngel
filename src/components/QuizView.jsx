import React, { useState } from "react";
import axios from "axios";

export default function QuizView({ doc }) {
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const getQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/generate-questions", {
        doc_id: doc.id,
        num_questions: 5,
      });
      setQuiz(res.data.payload);
    } catch (err) {
      console.error(err);
      alert("Error generating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Quiz</h2>
      <button
        onClick={getQuiz}
        disabled={loading}
        className="mb-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? "Working..." : "Generate Quiz"}
      </button>
      <pre className="whitespace-pre-wrap">{quiz}</pre>
    </div>
  );
}
