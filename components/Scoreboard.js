"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Scoreboard({ matchId }) {
  const [match, setMatch] = useState(null);
  const [runs, setRuns] = useState(0);
  const [batsman, setBatsman] = useState("");
  const [bowler, setBowler] = useState("");
  const [over, setOver] = useState(1);
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    axios.get(`/api/matches/${matchId}`).then((res) => {
      setMatch(res.data);
    });

    socket.on("updateScore", (newBall) => {
      setMatch((prev) => ({
        ...prev,
        innings: prev.innings.map((inning) =>
          inning._id === newBall.inning
            ? { ...inning, total_runs: inning.total_runs + newBall.runs_scored }
            : inning
        ),
      }));
    });

    return () => socket.off("updateScore");
  }, [matchId]);

  const addBall = async (run) => {
    if (balls.length === 6) {
      const newBowler = prompt("Over completed! Enter new bowler:");
      if (newBowler) {
        setBowler(newBowler);
        setOver(over + 1);
        setBalls([]);
      }
      return;
    }

    const newBall = {
      match: matchId,
      inning: match.innings[0]._id,
      over,
      ball_number: balls.length + 1,
      bowler,
      batsman:match.innings[0].batsmen[-1],
      runs_scored: run,
    };

    await axios.post(`/api/matches/${matchId}/balls`, newBall);
    setBalls([...balls, run]);
  };

  return (
    <div className="p-5 bg-green-600 text-white rounded shadow-md">
      <h1 className="text-2xl font-bold">{match?.team1} v/s {match?.team2}</h1>
      {match ? (
        <>
          <div className="bg-white text-black p-3 rounded mt-2">
            <p className="text-xl font-semibold">{match?.innings[0]?.team}, 1st Inning</p>
            <p className="text-3xl font-bold">{match?.innings[0]?.total_runs} - {match?.innings[0]?.total_wickets} ({over}.{balls.length-1})</p>
            <p className="text-sm">CRR: {(match?.innings[0]?.total_runs / (over || 1)).toFixed(2)}</p>
          </div>

          <div className="mt-4 p-3 bg-white text-black rounded">
            <h2 className="text-lg font-semibold">Batsman</h2>
            <p>{match.innings[0]?.batsmen[match.innings[0]?.batsmen.length-1].player_name || "Select Batsman"}*</p>
            <p>{match.innings[0]?.batsmen[0].player_name || "Select Batsman"}</p>
            <h2 className="text-lg font-semibold mt-2">Bowler</h2>
            <p>{match.innings[0]?.bowlers[match.innings[0]?.bowlers.length-1].player_name || "Select Bowler"}</p>
          </div>

          <div className="mt-4 p-3 bg-white text-black rounded">
            <h3 className="text-lg font-semibold">This Over:</h3>
            <div className="flex space-x-2 mt-2">
              {balls.map((run, index) => (
                <span key={index} className="p-2 border rounded bg-gray-200">{run}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((run) => (
              <button
                key={run}
                className="p-2 border rounded bg-white text-black text-center hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() => addBall(run)}
              >
                {run}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>Loading match details...</p>
      )}
    </div>
  );
}
