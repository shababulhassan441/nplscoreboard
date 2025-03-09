import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Match from "@/models/Match";

export async function GET(req, { params }) {
  await dbConnect();
  const match = await Match.findById((await params).id).populate('team1').populate('team2')

  if (!match)
    return NextResponse.json({ message: "Match not found" }, { status: 404 });

  return NextResponse.json(match, { status: 200 });
}
