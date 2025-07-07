import dbConnect from "@/lib/db";
import Inning from "@/models/Inning";
import Match from "@/models/Match";
import Batsman from "@/models/Batsman";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await dbConnect();
        const data = await req.json();
        const { _id:matchId, innings } = data;

        

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
          );
    }
}
