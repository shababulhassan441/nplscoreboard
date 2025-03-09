import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inning from "@/models/Inning";


export async function POST(req) {
    // const { matchId } = await params;
    const { inningId, newBall } = await req.json();
  
    try {
      await dbConnect(); // Ensure DB connection is established
  
      // Fetch the inning
      const inning = await Inning.findById(inningId);
      if (!inning) {
        return NextResponse.json({ error: "Inning not found" }, { status: 404 });
      }
  
      // Calculate overs
      const totalBalls = inning.balls.length + 1; // Including the new ball
      const newOvers = Math.floor(totalBalls / 6) + (totalBalls % 6) / 10;
  
      // Update the overs count in DB
      inning.overs = newOvers;
      await inning.save();
  
      return NextResponse.json({
        message: "Over updated successfully",
        overs: newOvers,
      });
    } catch (error) {
      console.error("Error updating over:", error);
      return NextResponse.json({ error: "Failed to update over count" }, { status: 500 });
    }
  }