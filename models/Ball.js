import mongoose from "mongoose";
import Player from "./Player";

const ballSchema = new mongoose.Schema(
  {
    ballNumber: Number, // Ball number in the over (1-6)
    runs: Number, // Runs scored on this ball
    isBoundary: { type: Boolean, default: false }, // true for 4s and 6s
    isSix: { type: Boolean, default: false }, // true for 6s
    isWide: { type: Boolean, default: false },
    isNoBall: { type: Boolean, default: false },
    isWicket: { type: Boolean, default: false },
    batsmanId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    bowlerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    dismissalType: {
      type: String,
      enum: [
        "bowled",
        "caught",
        "lbw",
        "run_out",
        "stumped",
        "hit_wicket",
        null,
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ball || mongoose.model("Ball", ballSchema);
