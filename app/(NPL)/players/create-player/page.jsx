"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreatePlayer = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  // Fetch available teams from the backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get("/api/npl/teams");
        setTeams(res.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleCreatePlayer = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/npl/players", {
        name: playerName,
        team: selectedTeam,
      });

      router.push("/players"); // Redirect after creating player
    } catch (error) {
      console.error("Error creating player:", error);
      alert("Failed to create player.");
    }
  };

  return (
    <Container>
      <Header title="New Player" backlink={"/players"} />

      <div className="p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4" onSubmit={handleCreatePlayer}>
          <p className="font-semibold text-[17px]">Player Name</p>
          <input
            required
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Player Name"
            className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="font-semibold text-[17px]">Select Team</p>
          <select
            required
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="py-4 border px-4"
          >
            <option value="">Select a Team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-[#0066FF] py-[12.5px] text-white font-semibold mt-[15px] cursor-pointer text-[18px] rounded-sm absolute bottom-4 left-0 right-0 mx-auto w-[90%]"
          >
            Create Player
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreatePlayer;
