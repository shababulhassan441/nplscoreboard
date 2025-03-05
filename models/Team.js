import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true }, //Team Name
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // List of players (references Player model)
    homeGround: { type: String, required: true }, //Home ground/ Stadium
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
