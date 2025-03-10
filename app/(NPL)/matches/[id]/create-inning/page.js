"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Container from "@/components/Container";
import Header from "@/components/Header";

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

        if (matchData.innings.length !== 0) {
          console.log("redirecting...")
          router.push(`/matches/${id}`);
          return;
        }
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
      const bowlerRes = await axios.post(`/api/npl/bowlers`, {
        playerId: bowler,
      });
      const bowlerId = bowlerRes.data._id;

      // Create Inning
      await axios.post(`/api/npl/matches/${id}/innings`, {
        teamId: battingTeam,
        batsmenStats: batsmenIds,
        bowlersStats: [bowlerId],
      });

      // router.push(`/matches/${id}`);
    } catch (error) {
      console.error("Error creating inning:", error);
    }
  };

  if (!match || !battingTeam || !bowlingTeam) return;

  return (
    <Container>
      <Header title="New Inning" backlink={`/matches/${id}`} />
      <div className="p-[20px] pt-[0px] space-y-3">
        <p className="text-lg p-4 rounded-sm bg-[#F1F5F9]">
          Batting Team:{" "}
          {match.team1 === battingTeam ? match.team1.name : match.team2.name}
        </p>
        <p className="text-lg p-4 rounded-sm bg-[#F1F5F9]">
          Bowling Team:{" "}
          {match.team1 === bowlingTeam ? match.team1.name : match.team2.name}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-[17px]">Select Striker:</label>
            <select
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={striker}
              onChange={(e) => setStriker(e.target.value)}
            >
              <option value="">Select Striker</option>
              {batsmen.filter((player) => player._id !== nonStriker).map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-[17px]">
              Select Non-Striker:
            </label>
            <select
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nonStriker}
              onChange={(e) => setNonStriker(e.target.value)}
            >
              <option value="">Select Non-Striker</option>
              {batsmen.filter((player) => player._id !== striker).map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-[17px]">Select Bowler:</label>
            <select
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Start Inning
          </button>
        </form>
      </div>
    </Container>
  );
}
