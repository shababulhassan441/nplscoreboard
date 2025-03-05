import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

export default function LiveScore() {
  const [score, setScore] = useState({ runs: 0, wickets: 0 });

  useEffect(() => {
    socket.on("updateScore", (ball) => {
      setScore((prev) => ({
        runs: prev.runs + ball.runs_scored,
        wickets: ball.wicket ? prev.wickets + 1 : prev.wickets,
      }));
    });
  }, []);

  return (
    <div>
      <h2>Live Score</h2>
      <p>Runs: {score.runs} | Wickets: {score.wickets}</p>
    </div>
  );
}
