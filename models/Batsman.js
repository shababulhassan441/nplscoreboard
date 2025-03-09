import mongoose from "mongoose";

const batsmanSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  runs: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  isOut: { type: Boolean, default: false },
  dismissalType: { type: String, enum: ["bowled", "caught", "lbw", "run_out", "stumped", "hit_wicket", null],default:null },
});

export default mongoose.models.Batsman || mongoose.model("Batsman", batsmanSchema);
