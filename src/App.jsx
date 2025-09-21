import React, { useState } from "react";
import UploadNotes from "./components/UploadNotes";
import SummaryView from "./components/SummaryView";
import QuizView from "./components/QuizView";
import FlashcardsView from "./components/FlashcardsView";

export default function App() {
  const [doc, setDoc] = useState(null);

  return (
   <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center py-10 px-4">
  <div className="max-w-5xl w-full">
    <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
      Personalized Study Assistant
    </h1>

    {/* Upload Section */}
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-gray-100">
      <UploadNotes onUploaded={(d) => setDoc(d)} />
    </div>

    {/* Results Section */}
    {doc && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryView doc={doc} />
        <QuizView doc={doc} />
        <FlashcardsView doc={doc} />
      </div>
    )}
  </div>
</div>

  );
}
