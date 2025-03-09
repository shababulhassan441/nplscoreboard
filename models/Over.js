import mongoose from "mongoose";
import Player from "./Player";
import Ball from "./Ball";

const OverSchema = new mongoose.Schema({
    overNumber: Number,
    balls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ball" }], // Array of balls bowled in this over
    totalRuns: { type: Number, default: 0 }, // Total runs scored in this over
    wickets: { type: Number, default: 0 }, // Total wickets fallen in this over
    bowlerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  });

  export default mongoose.models.Over || mongoose.model("Over", OverSchema)