"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get("/api/npl/players");
      setPlayers(res.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this player?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/npl/players", { data: { id } });
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player._id !== id)
      );
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <Container>
      <Header title="All Players" addnew addnewlink={"/players/create-player"} />
      <div className="p-2 flex flex-col gap-2">
        {players.map((player) => (
          <div
            key={player._id}
            className="px-3 py-4 bg-gray-200 flex justify-between items-center"
          >
            <span>{player.name}</span>
            <span>({player.team.name})</span>

            <div className="flex gap-3">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  router.push(`/players/edit-player/${player._id}`)
                }
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(player._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Players;
