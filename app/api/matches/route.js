import { NextResponse } from "next/server";
import Match from "@/models/Match";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const matches = await Match.find().populate("innings");
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
