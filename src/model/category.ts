import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const category = mongoose.model("categories", categorySchema);

export default category;
