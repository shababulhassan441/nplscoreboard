"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateMatch() {
  const router = useRouter();
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [venue, setVenue] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("");
  const [matchType, setMatchType] = useState("T20");
  const [overs, setOvers] = useState("");

  const handleCreateMatch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/matches", {
        team1: teamA,
        team2: teamB,
        team:tossWinner,
        venue,
        toss_winner: tossWinner,
        toss_decision: tossDecision,
        match_type: matchType,
        overs: matchType === "Test" ? null : overs, // No overs for Test matches
      });
      router.push(`/matches/${response.data._id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating match.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">Create a Match</h2>

      <form onSubmit={handleCreateMatch} className="space-y-4">
        <input
          type="text"
          placeholder="Team A"
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Team B"
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
          className="border p-2 w-full"
        />

        {/* Toss Winner Selection */}
        <select
          value={tossWinner}
          onChange={(e) => setTossWinner(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Toss Winner</option>
          <option value={teamA}>{teamA || "Team A"}</option>
          <option value={teamB}>{teamB || "Team B"}</option>
        </select>

        {/* Toss Decision */}
        <select
          value={tossDecision}
          onChange={(e) => setTossDecision(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Toss Decision</option>
          <option value="Bat">Bat</option>
          <option value="Bowl">Bowl</option>
        </select>

        {/* Match Type Selection */}
        <select
          value={matchType}
          onChange={(e) => setMatchType(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="T20">T20</option>
          <option value="ODI">ODI</option>
          <option value="Test">Test</option>
        </select>

        {/* Overs (Only for T20 & ODI) */}
        {(matchType === "T20" || matchType === "ODI") && (
          <input
            type="number"
            placeholder="Overs"
            value={overs}
            onChange={(e) => setOvers(e.target.value)}
            required
            className="border p-2 w-full"
            min="1"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Create Match
        </button>
      </form>
    </div>
  );
}
