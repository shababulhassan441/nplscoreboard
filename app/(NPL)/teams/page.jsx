"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("/api/npl/teams");
      setTeams(res.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this team?");
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/npl/teams", { data: { id } });
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== id));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <Container>
      <Header title="All Teams" addnew addnewlink={"/teams/create-team"} />
      <div className="p-2 flex flex-col gap-2">
        {teams.map((team) => (
          <div key={team._id} className="px-3 py-4 bg-gray-200 flex justify-between items-center">
            <span>{team.name}</span>
            <div className="flex gap-3">
              <FaEdit className="text-blue-500 cursor-pointer" onClick={() => router.push(`/teams/edit-team/${team._id}`)} />
              <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(team._id)} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Teams;
