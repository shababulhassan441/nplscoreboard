import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Popup = ({ isVisible, onClose ,setOutBatsmanId}) => {
  const [newBatsman, setNewBatsman] = useState("");
  const [outPlayer, setOutPlayer] = useState("");
  const [outMethod, setOutMethod] = useState("");
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [players, setPlayers] = useState([]);
  const [match, setMatch] = useState(null);

  const { id } = useParams();
  const router = useRouter();

  const outOptions = [
    "Bowled",
    "Caught Out",
    "Run Out",
    "LBW",
    "Stumping",
    "Hit Wicket",
  ];
  const dummyplayer = [{ _id: 1, name: "hassan" }];

  useEffect(() => {
    async function fetchPlayersData() {
      try {
        const res = await axios.get(`/api/npl/matches/${id}`);
        const matchData = res.data;
        setMatch(matchData);

      
        const isFirstInning = matchData.innings.length === 1;
        console.log("first inngn", matchData.innings)
        let batting, bowling;
        if (isFirstInning) {
          batting =
            matchData.toss_decision === "Batting"
              ? matchData.toss_winner
              : matchData.team1._id === matchData.toss_winner._id
              ? matchData.team2
              : matchData.team1;
          bowling =
            batting._id === matchData.team1._id
              ? matchData.team2
              : matchData.team1;
        } else {
          batting =
            matchData.innings[0].teamId === matchData.team1._id
              ? matchData.team2
              : matchData.team1;
          bowling =
            batting._id === matchData.team1._id
              ? matchData.team2
              : matchData.team1;
        }

        console.log("current match ...",matchData)
        console.log("Batting Team:", batting.name);
        console.log("bowling Team:", bowling.name);

        
        const strikerId = matchData.innings[0].striker.playerId;   // ID of the striker
        const nonStrikerId = matchData.innings[0].nonStriker.playerId; // ID of the non-striker
        setStriker(strikerId)
        setNonStriker(nonStrikerId)
        const battingTeamRes = await axios.get(`/api/npl/teams/${batting._id}`);
        const bowlingTeamRes = await axios.get(`/api/npl/teams/${bowling._id}`);
        console.log("batting data:", battingTeamRes.data.players); // Check if players are coming correctly
        console.log("bowling data:", bowlingTeamRes.data.players); // Check if players are coming correctly
        console.log(battingTeamRes.data.players)
        const filteredPlayers = battingTeamRes.data.players.filter(playerid => playerid._id !== strikerId && playerid._id !== nonStrikerId)
        setPlayers(filteredPlayers);
        console.log(filteredPlayers)
        // setOutBatsmanId()
      } catch (error) {
        console.log("Error fetching Players", error);
      }
    }

    fetchPlayersData();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBatsman || !outPlayer || !outMethod) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Step 1: Directly use newBatsman (which is already a player ID)
      console.log(
        `Replacing ${outPlayer} with new batsman ID: ${newBatsman}, Out by: ${outMethod}`

      );

      setOutBatsmanId(outPlayer)

      // Step 2: Create New Batsman entry using playerId
      // const batsmanRes = await axios.post(`/api/npl/batsmen`, {
      //   players: [newBatsman],
      // });

      // console.log("New Batsman Created:", batsmanRes.data[0]);

      // Reset State
      setNewBatsman("");
      setOutPlayer("");
      setOutMethod("");

      // Close Modal
      onClose();
    } catch (error) {
      console.error("Error creating batsman:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/25 flex justify-center items-center">
      <div className="w-[400px] py-[20px] bg-white/80 backdrop-blur-sm rounded-sm flex justify-center">
        <div className="flex flex-col gap-4 w-full px-6">
          <h2 className="font-semibold text-[22px] text-center">
            Batsman Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* New Batsman Name */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-[17px]">
                Select New Batsman:
              </label>
              <select
                className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newBatsman}
                onChange={(e) => setNewBatsman(e.target.value)}
              >
                <option value="">Select a player</option>
                {players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Who is Out? */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold text-[17px]">Who is Out?</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="outPlayer"
                    value={striker}
                    checked={outPlayer === striker}
                    onChange={(e) => setOutPlayer(e.target.value)}
                  />
                  <span>Striker</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="outPlayer"
                    value={nonStriker}
                    checked={outPlayer === nonStriker}
                    onChange={(e) => setOutPlayer(e.target.value)}
                  />
                  <span>Non-Striker</span>
                </label>
              </div>
            </div>

            {/* How the Batsman Got Out */}
            {outPlayer && (
              <div className="flex flex-col space-y-2">
                <label className="font-semibold text-[17px]">
                  How was the batsman out?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {outOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="outMethod"
                        value={option}
                        checked={outMethod === option}
                        onChange={(e) => setOutMethod(e.target.value)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-sm"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
