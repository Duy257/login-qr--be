import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
});

const director = mongoose.model("directors", directorSchema);

export default director;
