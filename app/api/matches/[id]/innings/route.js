import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Inning from "@/models/Inning";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  await dbConnect();
  const innings = await Inning.find({ match: (await params).id }).populate(["batsmen", "bowlers", "balls"]);
  
  if (!innings.length) return NextResponse.json({ message: "No innings found" }, { status: 404 });

  return NextResponse.json(innings, { status: 200 });
}


export async function POST(req, { params }) {
    await dbConnect();
    try {
      const body = await req.json();
  
      const newInning = new Inning({
        match: (await params).id,
        team: body.team,
        total_runs: 0,
        total_wickets: 0,
        overs: 0,
        batsmen: [],
        bowlers: [],
        balls: [],
      });
  
      await newInning.save();
      return NextResponse.json(newInning, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to create inning." }, { status: 500 });
    }
  }
  

  export async function PATCH(req, { params }) {
    await dbConnect();

    try {
        console.log("PATCH API Called!");

        // Ensure `params` is handled correctly
        const inningId = (await params)?.id;
        console.log("Params ID:", inningId);

        if (!inningId) {
            return NextResponse.json({ error: "Missing Inning ID" }, { status: 400 });
        }

        // Ensure ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(inningId)) {
            return NextResponse.json({ error: "Invalid Inning ID" }, { status: 400 });
        }

        const body = await req.json();
        console.log("Request Body:", body);

        // Filter out invalid ObjectIds before conversion
        const convertToObjectId = (array) => {
            return array
                .filter(id => mongoose.Types.ObjectId.isValid(id)) // Keep only valid ObjectIds
                .map(id => new mongoose.Types.ObjectId(id));
        };

        const updateData = {
            ...body,
            batsmen: Array.isArray(body.batsmen) ? convertToObjectId(body.batsmen) : [],
            bowlers: Array.isArray(body.bowlers) ? convertToObjectId(body.bowlers) : [],
        };

        const inning = await Inning.findByIdAndUpdate(
            inningId,
            updateData,
            { new: true }
        ).populate("batsmen bowlers balls");

        if (!inning) {
            return NextResponse.json({ error: "Inning not found" }, { status: 404 });
        }

        return NextResponse.json(inning);

    } catch (error) {
        console.error("Error Updating Inning:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
  
  export async function DELETE(req, { params }) {
    await dbConnect();
    try {
      const inning = await Inning.findByIdAndDelete(params.id);
      
      if (!inning) {
        return NextResponse.json({ error: "Inning not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Inning deleted successfully" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete inning." }, { status: 500 });
    }
  }
  