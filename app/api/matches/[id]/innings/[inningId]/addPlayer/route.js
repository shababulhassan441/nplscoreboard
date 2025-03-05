import { NextResponse } from "next/server"; 
import Inning from "@/models/Inning";
import Batsman from "@/models/Batsman";
import Bowler from "@/models/Bowler";
import dbConnect from "@/lib/db";

export async function POST(req, { params }) {
  await dbConnect();

  const { inningId } = await params;
  const { type, players } = await req.json();

  if (!["batsman", "bowler"].includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  if (!Array.isArray(players) || players.length === 0 || players.length > 2) {
    return NextResponse.json({ error: "Players must be an array with 1 or 2 names" }, { status: 400 });
  }

  try {
    let addedPlayers = [];

    if (type === "batsman") {
      // Add one or two batsmen
      for (const name of players) {
        const batsman = await Batsman.create({ player_name:name });
        addedPlayers.push(batsman);
        await Inning.findByIdAndUpdate(inningId, { $push: { batsmen: batsman._id } });
      }
    } else {
      // Add a single bowler
      const bowler = await Bowler.create({ player_name: players[0] });
      addedPlayers.push(bowler);
      await Inning.findByIdAndUpdate(inningId, { $push: { bowlers: bowler._id } });
    }

    return NextResponse.json({ success: true, addedPlayers }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
