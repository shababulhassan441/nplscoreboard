import dbConnect from "@/lib/db";
import Player from "@/models/Player";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // Step 1: Create a Player
    const newPlayer = new Player(body);
    await newPlayer.save();

        // Step 2: Push Player to the Team
        if (body.team) {
          await Team.findByIdAndUpdate(body.team, { $push: { players: newPlayer._id } });
        }

    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    console.error("Error creating Player:", error);
    return NextResponse.json(
      { error: "Error creating Player" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await dbConnect();
    const Players = await Player.find().populate("team")
    return NextResponse.json(Players, { status: 200 });
  } catch (error) {
    console.error("Error fetching Players:", error);
    return NextResponse.json(
      { error: "Error fetching Players" },
      { status: 500 }
    );
  }
}

// Update a Player
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error updating Player:", error);
    return NextResponse.json({ error: "Error updating Player" }, { status: 500 });
  }
}

// Delete a Player
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedPlayer = await Player.findByIdAndDelete(id);
    if (!deletedPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Player deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Player:", error);
    return NextResponse.json({ error: "Error deleting Player" }, { status: 500 });
  }
}