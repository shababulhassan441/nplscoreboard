"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PlayerForm = () => {
  const router = useRouter();
  const { id: playerId } = useParams(); // Get player ID from URL params
  const [playerName, setPlayerName] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  // Fetch available teams
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

  // Fetch existing player data if editing
  useEffect(() => {
    if (playerId) {
      axios
        .get(`/api/npl/players/${playerId}`)
        .then((res) => {
          setPlayerName(res.data.name);
          setSelectedTeam(res.data.team._id); // Load player's team
        })
        .catch((err) => console.error("Error fetching player:", err));
    }
  }, [playerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (playerId) {
        // Update existing player
        await axios.put(`/api/npl/players/${playerId}`, {
          name: playerName,
          team: selectedTeam,
        });
      } else {
        // Create new player
        await axios.post("/api/npl/players", {
          name: playerName,
          team: selectedTeam,
        });
      }

      router.push("/players"); // Redirect after save
    } catch (error) {
      console.error(error);
      alert(`Error ${playerId ? "updating" : "creating"} player.`);
    }
  };

  return (
    <Container>
      <Header title={playerId ? "Edit Player" : "New Player"} backlink={"/players"} />
      <div className="p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {playerId ? "Update Player" : "Create Player"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default PlayerForm;
