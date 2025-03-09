import dbConnect from "@/lib/db";
import Inning from "@/models/Inning";
import Match from "@/models/Match";

import { NextResponse } from "next/server";

export async function POST(req, {params}) {
  await dbConnect();
  const body = await req.json();
  const matchID = (await params).id;

  try {
    // Step 1: Create a Inning
    const newInning = new Inning(body);
    await newInning.save();

    console.log("match id ",matchID)
    // Step 2: Push Inning to the Team
    if (matchID) {
      await Match.findByIdAndUpdate(matchID, {
        $push: { innings: newInning._id },
      });
    }

    return NextResponse.json(newInning, { status: 201 });
  } catch (error) {
    console.error("Error creating Inning:", error);
    return NextResponse.json(
      { error: "Error creating Inning" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const Innings = await Inning.find().populate("team");
    return NextResponse.json(Innings, { status: 200 });
  } catch (error) {
    console.error("Error fetching Innings:", error);
    return NextResponse.json(
      { error: "Error fetching Innings" },
      { status: 500 }
    );
  }
}

// Update a Inning
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedInning = await Inning.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedInning) {
      return NextResponse.json({ error: "Inning not found" }, { status: 404 });
    }
    return NextResponse.json(updatedInning, { status: 200 });
  } catch (error) {
    console.error("Error updating Inning:", error);
    return NextResponse.json(
      { error: "Error updating Inning" },
      { status: 500 }
    );
  }
}

// Delete a Inning
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedInning = await Inning.findByIdAndDelete(id);
    if (!deletedInning) {
      return NextResponse.json({ error: "Inning not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Inning deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Inning:", error);
    return NextResponse.json(
      { error: "Error deleting Inning" },
      { status: 500 }
    );
  }
}
