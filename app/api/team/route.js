// import { dbConnect } from "@/lib/db";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const { name, players, homeGround } = await req.json();

    if (!name || !homeGround) {
      return NextResponse.json(
        { error: "Name and HomeGround are required" },
        { status: 400 }
      );
    }

    const newTeam = await Team.create({ name, players, homeGround });
    return NextResponse.json({ success: true, team: newTeam }, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
