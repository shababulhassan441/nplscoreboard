import dbConnect from "@/lib/db";
import Bowler from "@/models/Bowler";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // Step 1: Create a new Bowler
    const newBowler = new Bowler({ playerId: body.playerId });
    await newBowler.save();

    return NextResponse.json(newBowler, { status: 201 });
  } catch (error) {
    console.error("Error creating Bowler:", error);
    return NextResponse.json(
      { error: "Error creating Bowler" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await dbConnect();
    const Batsmen = await Bowler.find()
    return NextResponse.json(Batsmen, { status: 200 });
  } catch (error) {
    console.error("Error fetching Batsmen:", error);
    return NextResponse.json(
      { error: "Error fetching Batsmen" },
      { status: 500 }
    );
  }
}

// Update a Bowler
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedBowler = await Bowler.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBowler) {
      return NextResponse.json({ error: "Bowler not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBowler, { status: 200 });
  } catch (error) {
    console.error("Error updating Bowler:", error);
    return NextResponse.json({ error: "Error updating Bowler" }, { status: 500 });
  }
}

// Delete a Bowler
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedBowler = await Bowler.findByIdAndDelete(id);
    if (!deletedBowler) {
      return NextResponse.json({ error: "Bowler not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Bowler deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Bowler:", error);
    return NextResponse.json({ error: "Error deleting Bowler" }, { status: 500 });
  }
}