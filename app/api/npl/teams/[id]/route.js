import { NextResponse } from "next/server";
import Team from "@/models/Team";
import dbConnect from "@/lib/db";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { id } = await params; // Get the team ID from the URL
    const team = await Team.findById(id).populate("players");

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Error fetching team" },
      { status: 500 }
    );
  }
}
