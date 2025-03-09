import mongoose from "mongoose";
import Batsman from "./Batsman";
import Bowler from "./Bowler";
import Over from "./Over";


const inningSchema =new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  overs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Over" }], // Array of overs in the innings
  currentOverNumber: { type: Number, default: 0 },
  currentBallNumber: { type: Number, default: 1 }, // 1-6 per over
  batsmenStats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Batsman" }], // Batting stats for each player
  bowlersStats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bowler" }], // Bowling stats for each player
});

export default mongoose.models.Inning || mongoose.model("Inning", inningSchema);
