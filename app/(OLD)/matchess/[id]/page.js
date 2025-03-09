// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Scoreboard from "@/components/Scoreboard";
// import Link from "next/link";

// export default function MatchDetails() {
//   const { id } = useParams();
//   const [match, setMatch] = useState(null);
//   const [innings, setInnings] = useState([]);
//   const [batsman, setBatsman] = useState("");
//   const [bowler, setBowler] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const matchRes = await axios.get(`/api/matches/${id}`);
//         setMatch(matchRes.data);

//         const inningsRes = await axios.get(`/api/matches/${id}/innings`);
//         setInnings(inningsRes.data);
//         console.log(inningsRes.data);

//         // Show popup to enter batsman and bowler if an innings exists but has no players
//         if (inningsRes.data.length > 0 && inningsRes.data[0].batsmen.length === 0) {
//           setShowPopup(true);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, [id]);



//   const handleStartInning = async () => {
//     if (!batsman || !bowler) {
//       alert("Please enter both batsman and bowler.");
//       return;
//     }
  
//     try {
//       const inningId = innings[0]._id;
//       await axios.patch(`/api/matches/${id}/innings`, {
//         id: inningId, // Ensure the API receives the correct inning ID
//         batsmen: batsman,
//         bowlers: bowler,
//       });
  
//       // Refresh innings after updating
//       const updatedInnings = await axios.get(`/api/matches/${id}/innings`);
//       setInnings(updatedInnings.data);
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error updating inning:", error);
//     }
//   };
  

//   if (!match) return <p className="p-6">Loading match details...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-semibold">Enter Batsman and Bowler</h3>
//             <input
//               type="text"
//               placeholder="Batsman Name"
//               value={batsman}
//               onChange={(e) => setBatsman(e.target.value)}
//               className="border p-2 w-full mt-2"
//             />
//             <input
//               type="text"
//               placeholder="Bowler Name"
//               value={bowler}
//               onChange={(e) => setBowler(e.target.value)}
//               className="border p-2 w-full mt-2"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 mt-4"
//               onClick={handleStartInning}
//             >
//               Start Inning
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="my-4">
//         <Link className="p-4 bg-blue-400 text-white " href="/matches">
//           Home
//         </Link>
//       </div>
//       <h2 className="text-2xl font-bold">
//         {match.team1} vs {match.team2}
//       </h2>
      
//       <p className="text-gray-600">Venue: {match.venue}</p>
//       <p className="text-gray-600">Status: {match.status}</p>

//       {/* Toss Result */}
//       {match.toss_winner && match.toss_decision && (
//         <p className="text-lg font-semibold mt-4">
//           {match.toss_winner} won the toss and elected to {match.toss_decision} first.
//         </p>
//       )}

//       {/* Display Innings */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Innings</h3>
//         {innings.length === 0 ? (
//           <p>No innings added yet.</p>
//         ) : (
//           innings.map((inning) => (
//             <div key={inning._id} className="border p-4 mt-2 rounded shadow">
//               <p className="font-semibold">
//                 Batting: {inning.team || "Not Assigned"}
//               </p>
//               <p>
//                 Runs: {inning.total_runs} | Wickets: {inning.total_wickets} | Overs: {inning.overs}
//               </p>
//               <p>Batsmen: {inning.batsmen.join(", ") || "Not Assigned"}</p>
//               <p>Bowler: {inning.bowlers.join(", ") || "Not Assigned"}</p>
//             </div>
//           ))
//         )}
//       </div>

//       <Scoreboard matchId={id} />
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Scoreboard from "@/components/Scoreboard";
import Link from "next/link";

export default function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [innings, setInnings] = useState([]);
  const [batsmen, setBatsmen] = useState(["", ""]); // Two batsmen inputs
  const [bowler, setBowler] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const matchRes = await axios.get(`/api/matches/${id}`);
        setMatch(matchRes.data);

        const inningsRes = await axios.get(`/api/matches/${id}/innings`);
        setInnings(inningsRes.data);
        console.log(inningsRes.data);

        // Show popup to enter batsman and bowler if an innings exists but has no players
        if (inningsRes.data.length > 0 && inningsRes.data[0].batsmen.length === 0) {
          setShowPopup(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleStartInning = async () => {
    const filteredBatsmen = batsmen.filter((name) => name.trim() !== ""); // Only send non-empty names
    if (filteredBatsmen.length === 0 || !bowler.trim()) {
      alert("Please enter at least one batsman and one bowler.");
      return;
    }

    try {
      const inningId = innings[0]._id;

      // Add batsmen (1 or 2)
      await axios.post(`/api/matches/${id}/innings/${inningId}/addPlayer`, {
        type: "batsman",
        players: filteredBatsmen,
      });

      // Add bowler
      await axios.post(`/api/matches/${id}/innings/${inningId}/addPlayer`, {
        type: "bowler",
        players: [bowler],
      });

      // Refresh innings after updating
      const updatedInnings = await axios.get(`/api/matches/${id}/innings`);
      setInnings(updatedInnings.data);
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating inning:", error);
    }
  };

  if (!match) return <p className="p-6">Loading match details...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold">Enter Batsmen and Bowler</h3>
            
            {/* Batsmen Inputs */}
            {batsmen.map((batsman, index) => (
              <input
                key={index}
                type="text"
                placeholder={` ${index ===0 ? "Stricker" : "Non-Stricker"} `}
                value={batsman}
                onChange={(e) => {
                  const newBatsmen = [...batsmen];
                  newBatsmen[index] = e.target.value;
                  setBatsmen(newBatsmen);
                }}
                className="border p-2 w-full mt-2"
              />
            ))}

            {/* Bowler Input */}
            <input
              type="text"
              placeholder="Bowler Name"
              value={bowler}
              onChange={(e) => setBowler(e.target.value)}
              className="border p-2 w-full mt-2"
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4"
              onClick={handleStartInning}
            >
              Start Inning
            </button>
          </div>
        </div>
      )}

      <div className="my-4">
        <Link className="p-4 bg-blue-400 text-white" href="/matches">
          Home
        </Link>
      </div>
      <h2 className="text-2xl font-bold">
        {match.team1} vs {match.team2}
      </h2>
      <p className="text-gray-600">Venue: {match.venue}</p>
      <p className="text-gray-600">Status: {match.status}</p>

      {/* Toss Result */}
      {match.toss_winner && match.toss_decision && (
        <p className="text-lg font-semibold mt-4">
          {match.toss_winner} won the toss and elected to {match.toss_decision} first.
        </p>
      )}


      <Scoreboard matchId={id} />
    </div>
  );
}
