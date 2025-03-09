import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";


// List all collections and delete data
export async function DELETE() {
  try {
    await dbConnect();
    
    // Get all collections
    const collections = await mongoose.connection.db.collections();
    
    // Delete all documents in each collection
    for (const collection of collections) {
      await collection.deleteMany({});
    }

    return NextResponse.json({ message: "All data deleted successfully" });
  } catch (error) {
    console.error("Error clearing database:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
