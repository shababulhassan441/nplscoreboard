import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

import Match from "@/models/Match";
import Inning from "@/models/Inning";
import Over from "@/models/Over";
import Ball from "@/models/Ball";
import Batsman from "@/models/Batsman";
import Bowler from "@/models/Bowler";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Connect to WebSocket server

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    console.log("data with add ball",data)
    // console.log("outbatsman id ",outBatsmanId)
    const { _id: matchId, runs, innings ,outBatsmanId } = data;

    // Create new ball entry
    const ball = new Ball({
      ballNumber: data.innings[0].currentBallNumber + 1,
      runs: runs,
      isBoundary: runs === 4 || runs === 6,
      isSix: runs === 6,
      isWicket: data.isWicket || false, // If wicket info is passed in data
    });
    await ball.save();

    const currentOver = data.innings[0].over;
    const bowlerID = data.innings[0].over.bowlerId;
    const isOverComplete = data.innings[0].currentBallNumber >= 5;
    const isOddRun = runs % 2 !== 0; // Check if the last run is odd


    await Over.findByIdAndUpdate(currentOver._id, {
      $push: { balls: ball._id },
      $inc: { totalRuns: runs, wickets: ball.isWicket ? 1 : 0 },
    });

    const currentOverNumber = data.innings[0].currentOverNumber;
    if (isOverComplete) {
      const newOver = new Over({
        bowlerId: bowlerID,
        overNumber: currentOverNumber,
      });

      await newOver.save(); // Ensure save is completed

      // Update Inning stats
      await Inning.findByIdAndUpdate(data.innings[0]._id, {
        over: newOver._id,
        $push: { overs: newOver._id },
        $inc: {
          currentOverNumber: 1,
          totalRuns: runs,
          totalWickets: ball.isWicket ? 1 : 0,
        },
        $set: {
          striker: innings[0].nonStriker,
          nonStriker: innings[0].striker,
        },
        currentBallNumber: 0,
      });
    } else {
      // Just increment ball number if over is not complete
      await Inning.findByIdAndUpdate(data.innings[0]._id, {
        $inc: {
          totalRuns: runs,
          totalWickets: ball.isWicket ? 1 : 0,
          currentBallNumber: 1,
        },
      });

       // Swap batsmen if an odd run is scored
       if (isOddRun) {
        await Inning.findByIdAndUpdate(data.innings[0]._id, {
          $set: {
            striker: innings[0].nonStriker,
            nonStriker: innings[0].striker,
          },
        });
      }
    }

 

    // get striker id
    const strikerId = innings[0].striker._id;
    console.log("thsi is striker", strikerId);

    // Update batsman stats
    const batsmanUpdate = {
      $inc: {
        runs: runs,
        ballsFaced: 1,
        fours: runs === 4 ? 1 : 0,
        sixes: runs === 6 ? 1 : 0,
      },
    };
  

    await Batsman.findByIdAndUpdate(strikerId, batsmanUpdate, {
      new: true,
    });


      // If the batsman is out, we also need to mark them as out and record the dismissal type
      // if (ball.isWicket) {
      //   batsmanUpdate.$set = {
      //     isOut: true,
      //   };
      // }

    const bowlerId = innings[0].bowler._id;

    const bowlerUpdate = {
      $inc: {
        runsConceded: runs,
        wickets: ball.isWicket ? 1 : 0,
        overs: isOverComplete ? 1 : 0,
      },
      // overs:newOver._id,
    };

    await Bowler.findByIdAndUpdate(bowlerId, bowlerUpdate, {
      new: true,
    });

    const updatedMatch = await Match.findById(matchId)
      .populate("team1")
      .populate("team2")
      .populate({
        path: "innings",
        populate: [
          { path: "batsmenStats", populate: { path: "playerId" } },
          { path: "bowlersStats", populate: { path: "playerId" } },
          { path: "striker" },
          { path: "nonStriker" },
          { path: "bowler" },
          { path: "over", populate: { path: "balls" } },
        ],
      })
      .populate("toss_winner");

    // Emit live update
    socket.emit("matchupdated", updatedMatch);

    return NextResponse.json(
      { message: "Ball recorded successfully", ball },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording ball:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const Batsmen = await Ball.find();
    return NextResponse.json(Batsmen, { status: 200 });
  } catch (error) {
    console.error("Error fetching Batsmen:", error);
    return NextResponse.json(
      { error: "Error fetching Batsmen" },
      { status: 500 }
    );
  }
}

// Update a Ball
export async function PUT(req) {
  await dbConnect();
  const { id, ...updates } = await req.json();

  try {
    const updatedBall = await Ball.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedBall) {
      return NextResponse.json({ error: "Ball not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBall, { status: 200 });
  } catch (error) {
    console.error("Error updating Ball:", error);
    return NextResponse.json({ error: "Error updating Ball" }, { status: 500 });
  }
}

// Delete a Ball
export async function DELETE(req) {
  await dbConnect();
  const { id } = await req.json();

  try {
    const deletedBall = await Ball.findByIdAndDelete(id);
    if (!deletedBall) {
      return NextResponse.json({ error: "Ball not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Ball deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Ball:", error);
    return NextResponse.json({ error: "Error deleting Ball" }, { status: 500 });
  }
}
