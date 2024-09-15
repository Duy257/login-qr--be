import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  title: { type: Number },
  url: { type: String },
});

const episode = mongoose.model("episodes", episodeSchema);

export default episode;
