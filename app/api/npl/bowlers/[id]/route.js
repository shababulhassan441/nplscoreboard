import { NextResponse } from "next/server";
import Player from "@/models/Player";
import dbConnect from "@/lib/db";
import Team from "@/models/Team";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const player = await Player.findById((await params).id).populate("team");
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json({ error: "Error fetching player" }, { status: 500 });
  }
}

// export async function PUT(req, { params }) {
//   await dbConnect();
//   try {
//     const { name, team } = await req.json();
//     const updatedPlayer = await Player.findByIdAndUpdate((await params).id, { name, team }, { new: true });

//     if (!updatedPlayer) {
//       return NextResponse.json({ error: "Player not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedPlayer, { status: 200 });
//   } catch (error) {
//     console.error("Error updating player:", error);
//     return NextResponse.json({ error: "Error updating player" }, { status: 500 });
//   }
// }

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { name, team } = await req.json();
    const playerId = (await params).id;

    // Step 1: Find the existing player
    const existingPlayer = await Player.findById(playerId);
    if (!existingPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Step 2: If team is changing, remove from old team and add to new team
    if (team && existingPlayer.team?.toString() !== team) {
      if (existingPlayer.team) {
        await Team.findByIdAndUpdate(existingPlayer.team, { $pull: { players: playerId } });
      }
      await Team.findByIdAndUpdate(team, { $push: { players: playerId } });
    }

    // Step 3: Update the player
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, { name, team }, { new: true });

    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json({ error: "Error updating player" }, { status: 500 });
  }
}