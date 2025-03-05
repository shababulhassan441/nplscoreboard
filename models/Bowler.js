import mongoose from "mongoose";

const bowlerSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  inning: { type: mongoose.Schema.Types.ObjectId, ref: "Inning" },
  player_name: String,
  overs: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
  runs_conceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  economy_rate: { type: Number, default: 0 },
  dot_balls: { type: Number, default: 0 },
  wide_balls: { type: Number, default: 0 },
  no_balls: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Bowler || mongoose.model("Bowler", bowlerSchema);
