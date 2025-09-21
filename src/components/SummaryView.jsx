import React, { useState } from "react";
import axios from "axios";

export default function SummaryView({ doc }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/summarize", {
        doc_id: doc.id,
      });
      setSummary(res.data.payload);
    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl shadow-xl border border-gray-200 max-w-xl mx-auto mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 rounded-full p-3">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 3v18M12 3l7 7M12 3L5 10"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-extrabold text-2xl text-indigo-700 tracking-tight">Summary</h2>
      </div>
      <button
        onClick={getSummary}
        disabled={loading}
        className={`mb-5 w-full py-3 rounded-xl font-semibold text-lg transition 
          ${loading
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 cursor-pointer text-white shadow-lg shadow-indigo-100"
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Working...
          </span>
        ) : (
          "Generate Summary"
        )}
      </button>
      <div className="bg-white rounded-xl p-5 min-h-[100px] border border-indigo-100 shadow-inner transition">
        {summary ? (
          <pre className="whitespace-pre-wrap text-gray-800 font-medium text-base leading-relaxed">{summary}</pre>
        ) : (
          <p className="text-gray-400 text-center italic">No summary generated yet.</p>
        )}
      </div>
    </div>
  );
}