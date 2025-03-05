import mongoose from "mongoose";
import Batsman from "./Batsman";
import Bowler from "./Bowler";
import Ball from "./Ball";
const inningSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  team: String,
  total_runs: { type: Number, default: 0 },
  total_wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  batsmen: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batsman" }],
  bowlers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bowler" }],
  balls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ball" }]
}, { timestamps: true });

export default mongoose.models.Inning || mongoose.model("Inning", inningSchema);
