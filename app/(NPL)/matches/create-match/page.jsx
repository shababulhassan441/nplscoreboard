"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NewMatch = () => {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [tossDecision, setTossDecision] = useState("");
  const [overs, setOvers] = useState("");

  useEffect(() => {
    axios
      .get("/api/npl/teams")
      .then((res) => setTeams(res.data))
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!team1 || !team2 || !tossWinner || !tossDecision || !overs) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("/api/npl/matches", {
        team1,
        team2,
        toss_winner: tossWinner,
        toss_decision: tossDecision,
        overs,

      });
      router.push("/matches");
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Error creating match");
    }
  };

  return (
    <Container>
      <Header title="New Match" />
      <div className="p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Team Selection */}
          <p className="font-semibold text-[17px]">Teams</p>
          <div className="flex flex-col space-y-4">
            <select
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            >
              <option value="">Select Team 1</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
            <select
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            >
              <option value="">Select Team 2</option>
              {teams
                .filter((team) => team._id !== team1)
                .map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Toss Won By */}
          {team1 && team2 && (
            <>
              <p className="font-semibold text-[17px]">Toss Won By</p>
              <div className="flex space-x-4 p-4 rounded-sm bg-[#F1F5F9]">
                {[team1, team2].map((teamId) => {
                  const teamName = teams.find((t) => t._id === teamId)?.name;
                  return (
                    <div key={teamId} className="flex items-center">
                      <input
                        type="radio"
                        id={teamId}
                        name="tossWinner"
                        value={teamId}
                        checked={tossWinner === teamId}
                        onChange={(e) => setTossWinner(e.target.value)}
                        className="w-4 h-4 text-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={teamId}
                        className="ml-2 text-gray-700 select-none cursor-pointer"
                      >
                        {teamName}
                      </label>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Toss Decision */}
          <p className="font-semibold text-[17px]">Opted to?</p>
          <div className="flex space-x-4 p-4 rounded-sm bg-[#F1F5F9]">
            {["Batting", "Bowling"].map((decision) => (
              <div key={decision} className="flex items-center">
                <input
                  type="radio"
                  id={decision}
                  name="tossDecision"
                  value={decision}
                  checked={tossDecision === decision}
                  onChange={(e) => setTossDecision(e.target.value)}
                  className="w-4 h-4 text-blue-500 border-gray-300"
                />
                <label
                  htmlFor={decision}
                  className="ml-2 text-gray-700 select-none cursor-pointer"
                >
                  {decision}
                </label>
              </div>
            ))}
          </div>

          {/* Overs */}
          <p className="font-semibold text-[17px]">Overs</p>
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              placeholder="Overs"
              name="overs"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#0066FF] py-[12.5px] text-white font-semibold mt-[15px] cursor-pointer text-[18px] rounded-sm absolute bottom-4 left-0 right-0 mx-auto w-[90%]"
          >
            Create Match
          </button>
        </form>
      </div>
    </Container>
  );
};

export default NewMatch;
