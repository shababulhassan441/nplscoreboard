import mongoose, { Schema } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }, // Reference to the team
  },
  { timestamps: true }
);

const Player = mongoose.models.Player || mongoose.model("Player",PlayerSchema)

export default Player