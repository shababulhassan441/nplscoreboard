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
import Popup from "@/components/Popup";

const socket = io("http://localhost:3001");
export default function MatchDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [innings, setInnings] = useState([]);
  const [batsmen, setBatsmen] = useState(["", ""]);
  const [bowler, setBowler] = useState("");
  const [outBatsmanId, setOutBatsmanId] = useState(null);
  const [newBatsmanId, setNewBatsmanId] = useState("");
  const [currOver, setCurrOver] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isWicket, setIsWicket] = useState(false);  // Add state for Wicket checkbox
  const [showBatsmanPopup, setShowBatsmanPopup] = useState(false);
  const [selectedBatsman, setSelectedBatsman] = useState(null);
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
        setCurrOver(matchRes.data.innings[0].over)
        setMatch(matchRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    socket.on("updateScore", (updates) => {
      console.log("updates Receiveed....",updates)
      setInnings(updates.innings[0]);
      setBatsmen(updates.innings[0].batsmenStats);
      setBowler(updates.innings[0].bowlersStats);
      setCurrOver(updates.innings[0].over)
      setMatch(updates);
    });
    return () => socket.off("updateScore");
  }, []);

  if (!match) return;
  console.log("this match",match);
  console.log("this player is out =>",outBatsmanId)

  function calculateStrikeRate(runs, ballsFaced) {
    if (ballsFaced === 0) return 0; // Avoid division by zero
    return (runs / ballsFaced) * 100;
  }

  function calculateEconomyRate(runsConceded, overs) {
    if (overs === 0) return 0; // Avoid division by zero
    return runsConceded / overs;
  }


  async function addBall (scores){


    const ballUpdates={
      ...match,
      runs:scores,
      isWicket: isWicket,  // Add the isWicket information
      outBatsmanId, //out batsman id striker/nonSriker
    }
   
    setShowBatsmanPopup(isWicket)
    console.log("ball updates..> ",ballUpdates);
    setIsWicket(false);  // Reset wicket checkbox 
    await axios.post(`/api/npl/balls`, ballUpdates);
    // router.refresh()
  }

  async function swapSriker(){
    const matchData={
      ...match,
    }
    // setInnings(match)

    console.log("match data",matchData);
    await axios.post("/api/npl/swap-batsman",matchData)
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
              <p className="">
                {match.toss_winner.name}, won the Toss elect to{" "}
                {match.toss_decision === "Batting" ? "bat first" : "bowl first"}
                .
              </p>
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
              <p>3.77</p>
            </div>
          </div>
        </div>
        <BattingStats batsmen={batsmen} innings={innings} srikeRate={calculateStrikeRate} />
        <BowlerStats bowler={bowler} economyRate={calculateEconomyRate} />
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <p className="">This Over</p>
            {currOver.balls.length>0 && currOver.balls.map((ball,index) => <div key={index} className="flex gap-2">
              <p className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center">
                {ball.runs}
              </p>
            </div>)}
            
          </div>
        </div>
        <div className="bg-[#F1F5F9] rounded-md p-[10px]">
          <div className="flex rounded-md items-center bg-white p-2 gap-3 ">
            <div className="flex gap-3 justify-center items-center flex-wrap">
              <input 
              type="checkbox"
              checked={isWicket}  // Bind checkbox to state
              onChange={(e) => setIsWicket(e.target.checked)}  // Update state when checkbox is toggled
              />
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
              <Button text="Swap" clickFunc={() => swapSriker() } />
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
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((run) => (
                    <button
                      key={run}
                      className="border border-[#0066FF] rounded-full p-4 w-[15px] h-[15px] flex items-center justify-center"
                      onClick={() => addBall(run)}
                    >
                      {run}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup isVisible={showBatsmanPopup} onClose={()=> setShowBatsmanPopup(false)} setOutBatsmanId={setOutBatsmanId} />
      
    </Container>
  );
}

