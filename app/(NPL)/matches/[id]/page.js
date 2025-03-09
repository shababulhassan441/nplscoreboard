"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Scoreboard from "@/components/Scoreboard";
import Link from "next/link";

export default function MatchDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState(null);
  const [innings, setInnings] = useState([]);
  const [batsmen, setBatsmen] = useState(["", ""]);
  const [bowler, setBowler] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const matchRes = await axios.get(`/api/npl/matches/${id}`);
        setMatch(matchRes.data);

        // Redirect if no innings exist
        if (matchRes.data.innings.length === 0) {
          router.replace(`/matches/${id}/create-inning`);
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, router]);

  if (!match) return <p className="p-6">No Match Found</p>;

  return <div className="p-6 max-w-2xl mx-auto">ScoreBoard</div>;
}
