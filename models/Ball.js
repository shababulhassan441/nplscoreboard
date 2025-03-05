import mongoose from "mongoose";

const ballSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  inning: { type: mongoose.Schema.Types.ObjectId, ref: "Inning" },
  over: Number,
  ball_number: Number,
  bowler: String,
  batsman: String,
  runs_scored: Number,
  extra_type: String,
  wicket: { type: Boolean, default: false },
  dismissal_type: String
}, { timestamps: true });

export default mongoose.models.Ball || mongoose.model("Ball", ballSchema);
