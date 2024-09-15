import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
});

const cast = mongoose.model("casts", castSchema);

export default cast;
