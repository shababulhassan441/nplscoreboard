import mongoose, { Schema } from "mongoose";
import Player from "./Player";

const TeamSchema = new Schema({
  name: { type: String, required: true, unique: true }, //Team Name
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // List of players (references Player model)
});

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
