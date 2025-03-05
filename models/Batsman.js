import mongoose from "mongoose";

const batsmanSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  inning: { type: mongoose.Schema.Types.ObjectId, ref: "Inning" },
  player_name: String,
  runs: { type: Number, default: 0 },
  balls_faced: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  strike_rate: { type: Number, default: 0 },
  is_out: { type: Boolean, default: false },
  dismissal_type: String,
  bowler: String,
  fielder: String,
}, { timestamps: true });

export default mongoose.models.Batsman || mongoose.model("Batsman", batsmanSchema);
