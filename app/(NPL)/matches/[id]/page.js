"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { io } from "socket.io-client";
import Link from "next/link";
import Container from "@/components/Container";
import Header from "@/components/Header";
import BattingStats from "@/components/BattingStats";
import BowlerStats from "@/components/BowlerStats";
import Button from "@/components/Button";

export default function MatchDetails() {
  // const socket = io("http://localhost:3001");
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [innings, setInnings] = useState([]);
  const [batsmen, setBatsmen] = useState(["", ""]);
  const [bowler, setBowler] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data...");
      try {
        const matchRes = await axios.get(`/api/npl/matches/${id}`);

        // Redirect if no innings exist
        if (matchRes.data.innings.length === 0) {
          console.log("redirecting...");
          router.push(`/matches/${id}/create-inning`);
          return;
        }
        setInnings(matchRes.data.innings[0]);
        setBatsmen(matchRes.data.innings[0].batsmenStats);
        setBowler(matchRes.data.innings[0].bowlersStats);
        setMatch(matchRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  // useEffect(() => {
  //   socket.on("updateScore", (newBall) => {
  //     setMatch((prev) => ({
  //       ...prev,
  //       innings: prev.innings.map((inning) =>
  //         inning._id === newBall.inning
  //           ? { ...inning, total_runs: inning.total_runs + newBall.runs_scored }
  //           : inning
  //       ),
  //     }));
  //   });

  //   return () => socket.off("updateScore");
  // }, [id]);

  if (!match) return;

  function calculateStrikeRate(runs, ballsFaced) {
    if (ballsFaced === 0) return 0; // Avoid division by zero
    return (runs / ballsFaced) * 100;
  }

  function calculateEconomyRate(runsConceded, overs) {
    if (overs === 0) return 0; // Avoid division by zero
    return (runsConceded / overs);
}
  return (
    <Container>
      <Header
        title={`${match.team1.name} v/s ${match.team2.name}`}
        backlink={`/matches`}
      />

      <div className="flex flex-col gap-3 px-3">
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex justify-between items-end  rounded-sm bg-white p-2 ">
            <div className="flex flex-col gap-2">
              <p className="">Team A , 1st Inning</p>
              <div>
                <p className="text-[28px] font-semibold">
                  {innings.totalRuns} - {innings.totalWickets}{" "}
                  <span className="text-[20px]">
                    ({innings.currentOverNumber}.{innings.currentBallNumber})
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className=" uppercase">crr</p>
              <p>5.77</p>
            </div>
          </div>
        </div>
        <BattingStats batsmen={batsmen} srikeRate={calculateStrikeRate} />
        <BowlerStats bowler={bowler} economyRate={calculateEconomyRate} />
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <p className="">This Over</p>
            <div className="flex gap-2">
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                2
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                4
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                1
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                0
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                6
              </p>
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                2
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <div className="flex gap-3 justify-center items-center flex-wrap">
              <input type="checkbox" />
              <label>Wicket</label>
              <input type="checkbox" />
              <label>Wide</label>
              <input type="checkbox" />
              <label>No ball</label>
              <input type="checkbox" />
              <label>Byes</label>
              <input type="checkbox" />
              <label>LegBy</label>
            </div>
            <div className=" space-y-2">
              <Button text="Retire" />
              <Button text="Swap" />
            </div>
          </div>
        </div>
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <div className="w-[40%] p-1 rounded-sm border border-gray-100 ">
              <div className="flex flex-col p-2 bg-[#F1F5F9] rounded-sm  space-y-2">
                <Button text="undo" />
                <Button text="Partnership" />
                <Button text="extras" />
              </div>
            </div>
            <div className="w-[60%]  p-1 rounded-sm border border-gray-100  ">
              <div className=" flex gap-3 justify-center items-center flex-wrap p-2 bg-[#F1F5F9] rounded-sm">
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  0
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  1
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  2
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  3
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  4s
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  5
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  6s
                </p>
                <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                  ...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
