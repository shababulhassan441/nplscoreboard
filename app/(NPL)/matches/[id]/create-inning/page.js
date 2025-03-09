"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function CreateInning() {
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [batsmen, setBatsmen] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");

  useEffect(() => {
    async function fetchMatchDetails() {
      try {
        const res = await axios.get(`/api/npl/matches/${id}`);
        const matchData = res.data;
        setMatch(matchData);

        // Determine batting and bowling teams
        const isFirstInning = matchData.innings.length === 0;
        let batting, bowling;
        if (isFirstInning) {
          batting =
            matchData.toss_decision === "Batting"
              ? matchData.toss_winner
              : matchData.team1 === matchData.toss_winner
              ? matchData.team2
              : matchData.team1;
          bowling =
            batting === matchData.team1 ? matchData.team2 : matchData.team1;
        } else {
          batting =
            matchData.innings[0].teamId === matchData.team1
              ? matchData.team2
              : matchData.team1;
          bowling =
            batting === matchData.team1 ? matchData.team2 : matchData.team1;
        }
        setBattingTeam(batting);
        setBowlingTeam(bowling);
        console.log("batting", batting);
        console.log("bowling", bowling);
        // Fetch players for both teams
        const battingTeamRes = await axios.get(`/api/npl/teams/${batting._id}`);
        const bowlingTeamRes = await axios.get(`/api/npl/teams/${bowling._id}`);
        setBatsmen(battingTeamRes.data.players);
        setBowlers(bowlingTeamRes.data.players);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    }

    fetchMatchDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!striker || !nonStriker || !bowler) {
      alert("Please select all players.");
      return;
    }

    try {
      // Create Batsmen
      const batsmenRes = await axios.post(`/api/npl/batsmen`, {
        players: [striker, nonStriker],
      });
      const batsmenIds = batsmenRes.data.map((b) => b._id);

      // Create Bowler
      const bowlerRes = await axios.post(`/api/npl/bowlers`, { playerId: bowler });
      const bowlerId = bowlerRes.data._id;

      // Create Inning
      await axios.post(`/api/npl/matches/${id}/innings`, {
        teamId: battingTeam,
        batsmenStats: batsmenIds,
        bowlersStats: [bowlerId],
      });

      router.push(`/matches/${id}`);
    } catch (error) {
      console.error("Error creating inning:", error);
    }
  };

  if (!match || !battingTeam || !bowlingTeam) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Inning</h2>
      <p className="text-lg">
        Batting Team:{" "}
        {match.team1 === battingTeam ? match.team1.name : match.team2.name}
      </p>
      <p className="text-lg">
        Bowling Team:{" "}
        {match.team1 === bowlingTeam ? match.team1.name : match.team2.name}
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2">Select Striker:</label>
        <select
          className="border p-2 w-full"
          value={striker}
          onChange={(e) => setStriker(e.target.value)}
        >
          <option value="">Select Striker</option>
          {batsmen.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Select Non-Striker:</label>
        <select
          className="border p-2 w-full"
          value={nonStriker}
          onChange={(e) => setNonStriker(e.target.value)}
        >
          <option value="">Select Non-Striker</option>
          {batsmen.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2">Select Bowler:</label>
        <select
          className="border p-2 w-full"
          value={bowler}
          onChange={(e) => setBowler(e.target.value)}
        >
          <option value="">Select Bowler</option>
          {bowlers.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Start Inning
        </button>
      </form>
    </div>
  );
}
