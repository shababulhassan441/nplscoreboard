"use client" 
import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const newmatch = () => {
  const router=useRouter()
  const [teamName, setTeamName] = useState("");

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/npl/teams", {
        name: teamName,
      });
      router.push('/teams');
    } catch (error) {
      console.error(error);
      alert("Error creating Team.");
    }
  };

  return (
    <Container>
      <Header
        title="New Team"
        backlink={"/teams"}
     
      />
      <div className=" p-[20px] pt-[0px]">
        <form className="flex flex-col gap-4" onSubmit={handleCreateTeam}>
          <p className="font-semibold text-[17px]">Team Name</p>
          <div className="flex flex-col space-y-4 ">
            <input
              required
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
              className="p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0066FF] py-[12.5px] text-white font-semibold mt-[15px] cursor-pointer text-[18px] rounded-sm absolute bottom-4 left-0 right-0 mx-auto w-[90%]"
          >
            Create Team
          </button>
        </form>
      </div>
    </Container>
  );
};

export default newmatch;  