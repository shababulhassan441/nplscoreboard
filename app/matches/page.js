"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get("/api/matches").then((res) => setMatches(res.data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">All Matches</h2>
      <Link href="/matches/create" className="bg-green-500 text-white p-2 rounded block mt-4 text-center">
        Create New Match
      </Link>

      <div className="mt-6 space-y-4">
        {matches.map((match) => (
          <div key={match._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">
              {match.team1} vs {match.team2}
            </h3>
            <p className="text-gray-600">Venue: {match.venue}</p>
            <Link href={`/matches/${match._id}`} className="text-blue-500 mt-2 block">
              View Match Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
