"use client";

import { useState } from "react";

export default function ClearDBButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClearDB = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/clear-db", {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to clear database");

      setMessage("Database cleared successfully ✅");
    } catch (error) {
      setMessage(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={handleClearDB}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 disabled:bg-gray-400"
      >
        {loading ? "Clearing..." : "Clear Database"}
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
