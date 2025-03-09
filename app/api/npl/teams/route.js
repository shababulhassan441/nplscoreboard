import dbConnect from "@/lib/db";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // Step 1: Create a Team
    const newTeam = new Team(body);
    await newTeam.save();

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("Error creating Team:", error);
    return NextResponse.json(
      { error: "Error creating Team" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await dbConnect();
    const teams = await Team.find()
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Error fetching teams" },
      { status: 500 }
    );
  }
}

// Update a Team
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedTeam = await Team.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    console.error("Error updating Team:", error);
    return NextResponse.json({ error: "Error updating Team" }, { status: 500 });
  }
}

// Delete a Team
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Team deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Team:", error);
    return NextResponse.json({ error: "Error deleting Team" }, { status: 500 });
  }
}