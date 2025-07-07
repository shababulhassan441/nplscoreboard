import dbConnect from "@/lib/db";
import Over from "@/models/Over";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    // Step 1: Create a new Over
    const newOver = new Over(body);
    await newOver.save();

    return NextResponse.json(newOver, { status: 201 });
  } catch (error) {
    console.error("Error creating Over:", error);
    return NextResponse.json(
      { error: "Error creating Over" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await dbConnect();
    const Batsmen = await Over.find()
    return NextResponse.json(Batsmen, { status: 200 });
  } catch (error) {
    console.error("Error fetching Batsmen:", error);
    return NextResponse.json(
      { error: "Error fetching Batsmen" },
      { status: 500 }
    );
  }
}

// Update a Over
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedOver = await Over.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOver) {
      return NextResponse.json({ error: "Over not found" }, { status: 404 });
    }
    return NextResponse.json(updatedOver, { status: 200 });
  } catch (error) {
    console.error("Error updating Over:", error);
    return NextResponse.json({ error: "Error updating Over" }, { status: 500 });
  }
}

// Delete a Over
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedOver = await Over.findByIdAndDelete(id);
    if (!deletedOver) {
      return NextResponse.json({ error: "Over not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Over deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Over:", error);
    return NextResponse.json({ error: "Error deleting Over" }, { status: 500 });
  }
}