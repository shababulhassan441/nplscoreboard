import { NextResponse } from "next/server";
import Match from "@/models/Match";
import Inning from "@/models/Inning";
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

    // Step 2: Determine the first batting team
    const { toss_winner, toss_decision, team1, team2, match_type, overs } =
      body;
    const firstBattingTeam =
      toss_decision === "Bat"
        ? toss_winner
        : toss_winner === team1
        ? team2
        : team1;
    const firstBowlingTeam = firstBattingTeam === team1 ? team2 : team1;

    // Step 3: Create the first Inning
    const firstInning = new Inning({
      match: newMatch._id,
      team: newMatch.toss_winner,
      batting_team: firstBattingTeam,
      bowling_team: firstBowlingTeam,
      overs: match_type === "Test" ? null : overs,
    });

    await firstInning.save();

    // Step 4: Link the inning to the match
    newMatch.innings.push(firstInning._id);
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
