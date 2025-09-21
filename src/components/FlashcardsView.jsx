import React, { useState } from "react";
import axios from "axios";

export default function FlashcardsView({ doc }) {
  const [cards, setCards] = useState("");
  const [loading, setLoading] = useState(false);

  const getCards = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/flashcards", {
        doc_id: doc.id,
        count: 10,
      });
      setCards(res.data.payload);
    } catch (err) {
      console.error(err);
      alert("Error generating flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Flashcards</h2>
      <button
        onClick={getCards}
        disabled={loading}
        className="mb-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        {loading ? "Working..." : "Generate Flashcards"}
      </button>
      <pre className="whitespace-pre-wrap">{cards}</pre>
    </div>
  );
}
