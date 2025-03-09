import dbConnect from "@/lib/db";
import Batsman from "@/models/Batsman";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {

     // Step 1: Create Batsmen for all provided player IDs
     const batsmen = await Promise.all(
      body.players.map(async (playerId) => {
        const newBatsman = new Batsman({ playerId });
        await newBatsman.save();
        return newBatsman;
      })
    );

    return NextResponse.json(batsmen, { status: 201 });
    
  } catch (error) {
    console.error("Error creating Batsman:", error);
    return NextResponse.json(
      { error: "Error creating Batsman" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await dbConnect();
    const Batsmen = await Batsman.find()
    return NextResponse.json(Batsmen, { status: 200 });
  } catch (error) {
    console.error("Error fetching Batsmen:", error);
    return NextResponse.json(
      { error: "Error fetching Batsmen" },
      { status: 500 }
    );
  }
}

// Update a Batsman
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedBatsman = await Batsman.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBatsman) {
      return NextResponse.json({ error: "Batsman not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBatsman, { status: 200 });
  } catch (error) {
    console.error("Error updating Batsman:", error);
    return NextResponse.json({ error: "Error updating Batsman" }, { status: 500 });
  }
}

// Delete a Batsman
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedBatsman = await Batsman.findByIdAndDelete(id);
    if (!deletedBatsman) {
      return NextResponse.json({ error: "Batsman not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Batsman deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Batsman:", error);
    return NextResponse.json({ error: "Error deleting Batsman" }, { status: 500 });
  }
}