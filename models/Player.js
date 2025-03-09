import mongoose, { Schema } from "mongoose";

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default Player;
