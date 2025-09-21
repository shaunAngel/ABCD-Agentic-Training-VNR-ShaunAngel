import React, { useState } from "react";
import axios from "axios";

export default function UploadNotes({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("title", title || "Untitled");
    if (file) form.append("file", file);
    else form.append("text", text);

    try {
      const res = await axios.post("http://localhost:8000/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploaded(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter document title"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Paste text</label>
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Paste your notes here"
      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">Or upload file</label>
    <input
      type="file"
      accept=".pdf,.txt"
      onChange={(e) => setFile(e.target.files[0])}
      className="block w-full text-sm text-gray-600"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
  >
    {loading ? "Uploading..." : "Upload"}
  </button>
</form>

  );
}
