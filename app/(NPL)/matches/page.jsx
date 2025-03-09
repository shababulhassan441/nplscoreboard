"use client";

import Container from "@/components/Container";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPencil } from "react-icons/tb";
import Link from "next/link";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await axios.get("/api/npl/matches");
      setMatches(res.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this match?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete("/api/npl/matches", { data: { id } });
      setMatches((prevMatches) =>
        prevMatches.filter((match) => match._id !== id)
      );
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  return (
    <Container>
      <Header title="All Matches" addnew addnewlink={"/matches/create-match"} />
      <div className="p-2 flex flex-col gap-4">
        {matches.map((match) => (
          <div
            key={match._id}
            className="bg-white p-4 rounded-md border border-gray-300"
          >
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 text-sm">
                {new Date(match.createdAt).toLocaleDateString()}{" "}
                {new Date(match.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex flex-col gap-3  mt-3">
              <div className="flex flex-col gap-2 bg-[#F1F5F9] p-4 rounded-md">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full border border-blue-600 font-semibold text-blue-600 uppercase mr-4 flex items-center justify-center">
                    TA
                  </span>{" "}
                  <span className="font-semibold text-gray-700">
                    {match.team1.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full border border-blue-600 font-semibold text-blue-600 uppercase mr-4 flex items-center justify-center">
                    TB
                  </span>{" "}
                  <span className="font-semibold text-gray-700">
                    {match.team2.name}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center gap-3">
                <div>
                  {match.status === "Ongoing" ? (
                    <Link href={`/matches/${match._id}`}  className="bg-blue-500 text-white px-3 py-1 rounded-md">
                      Start Match
                    </Link>
                  ) : (
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                        Resume
                      </button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded-md">
                        ScoreBoard
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <TbPencil
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={() =>
                      router.push(`/matches/edit-match/${match._id}`)
                    }
                  />
                  <RiDeleteBin6Line
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={() => handleDelete(match._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Matches;
