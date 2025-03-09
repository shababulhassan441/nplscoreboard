import mongoose from "mongoose";

const bowlerSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  overs: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  noBalls: { type: Number, default: 0 },
  wides: { type: Number, default: 0 },
});

export default mongoose.models.Bowler || mongoose.model("Bowler", bowlerSchema);
