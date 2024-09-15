import mongoose from "mongoose";

const performerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
});

const performer = mongoose.model("performers", performerSchema);

export default performer;
