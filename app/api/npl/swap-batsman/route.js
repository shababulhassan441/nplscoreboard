import dbConnect from "@/lib/db";
import Inning from "@/models/Inning";
import Match from "@/models/Match";
import { NextResponse } from "next/server";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Connect to WebSocket server

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const { _id:matchId, innings } = data;


    const batsmanSwapped = await Inning.findByIdAndUpdate(
      innings[0]._id,
      {
        $set: {
          striker: innings[0].nonStriker,
          nonStriker: innings[0].striker,
        },
      },
      { new: true }
    );

     const updatedMatch = await Match.findById(matchId)
            .populate("team1")
            .populate("team2")
            .populate({
              path: "innings",
              populate: [
                { path: "batsmenStats", populate: { path: "playerId" } },
                { path: "bowlersStats", populate: { path: "playerId" } },
                { path: "striker" },
                { path: "nonStriker" },
                { path: "bowler" },
                { path: "over",populate: { path: "balls" } },
              ],
            })
            .populate("toss_winner");
    
      // Emit live update
      socket.emit("matchupdated", updatedMatch);

    return NextResponse.json(batsmanSwapped, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
