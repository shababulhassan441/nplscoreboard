// import { dbConnect } from "@/lib/db";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const { name, role, team } = data;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name, role, and team are required" },
        { status: 400 }
      );
    }
    const player = await Player.create(data);

    return NextResponse.json({ success: true, player }, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
