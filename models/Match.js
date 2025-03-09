import mongoose from "mongoose";
import Team from "./Team";

const matchSchema = new mongoose.Schema(
  {
    team1: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    team2: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    toss_winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    toss_decision: {
      type: String,
      enum: ["Batting", "Bowling", "All-rounder", "Wicketkeeper"],
      required: true,
    },
    status: { type: String, default: "Ongoing" },
    innings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inning" }],
    winner: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Match || mongoose.model("Match", matchSchema);
