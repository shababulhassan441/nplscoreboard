import { NextResponse } from "next/server";
import Match from "@/models/Match";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const matches = await Match.find().populate('team1').populate('team2')
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Error fetching matches" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // Step 1: Create a Match
    const newMatch = new Match(body);
    await newMatch.save();

    return NextResponse.json(newMatch, { status: 201 });
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      { error: "Error creating match" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  await dbConnect();
  
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Match ID is required" }, { status: 400 });
    }

    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Match deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json({ error: "Error deleting match" }, { status: 500 });
  }
}
