import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Ball from "@/models/Ball";
import Inning from "@/models/Inning";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Connect to WebSocket server

export async function POST(req, { params }) {
  await dbConnect();
  const body = await req.json();

  const newBall = new Ball({
    ...body,
    match: (await params).id,
  });

  await newBall.save();

  // Update Inning stats
  await Inning.findByIdAndUpdate(body.inning, {
    $push: { balls: newBall._id , current_over_balls: newBall._id },
    over:body.over,
    batsman:body.batsman,
    bowler:body.bowler,
    $inc: { total_runs: body.runs_scored, total_wickets: body.wicket ? 1 : 0 },
  });

  // Emit live update
  socket.emit("newBall", newBall);

  return NextResponse.json(newBall, { status: 201 });
}
