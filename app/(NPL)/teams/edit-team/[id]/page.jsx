"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewMatch = () => {
  const router = useRouter();
  const params = useParams();
  const {id:teamId} = params; // Get team ID from query params
  const [teamName, setTeamName] = useState("");

  // Fetch existing team details if editing
  useEffect(() => {
    if (teamId) {
      axios
        .get(`/api/npl/teams/${teamId}`)
        .then((res) => setTeamName(res.data.name))
        .catch((err) => console.error("Error fetching team:", err));
    }
  }, [teamId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (teamId) {
        // Update existing team
        await axios.put("/api/npl/teams", { id: teamId, name: teamName });
      } else {
        // Create new team
        await axios.post("/api/npl/teams", { name: teamName });
      }

      router.push(`/teams`);
    } catch (error) {
      console.error(error);
      alert(`Error ${teamId ? "updating" : "creating"} Team.`);
    }
  };

  return (
    <Container>
      <Header title={teamId ? "Edit Team" : "New Team"} backlink={"/teams"} />
      <div className="p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-semibold text-[17px]">Team Name</p>
          <div className="flex flex-col space-y-4">
            <input
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0066FF] py-[12.5px] text-white font-semibold mt-[15px] cursor-pointer text-[18px] rounded-sm absolute bottom-4 left-0 right-0 mx-auto w-[90%]"
          >
            {teamId ? "Update Team" : "Create Team"}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default NewMatch;
