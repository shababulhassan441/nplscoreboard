import mongoose from "mongoose";
import Inning from "./Inning";
const matchSchema = new mongoose.Schema({
  team1: String,
  team2: String,
  toss_winner: String,
  toss_decision: String,
  venue: String,
  match_type: String,
  status: { type: String, default: "Ongoing" },
  innings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inning" }],
  winner: { type: String, default: null },
}, { timestamps: true });

export default mongoose.models.Match || mongoose.model("Match", matchSchema);
