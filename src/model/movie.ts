import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  bgImage: { type: String },
  rating: { type: Number },
  view: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  urlTrailer: { type: String },
  type: [
    {
      type: String,
      enum: ["single", "theater", "series"],
    },
  ],
  yearRelease: { type: Number },
  country: { type: String },
  code: { type: String },
  slug: { type: String },
  tag: { type: String },
});

const movie = mongoose.model("movies", movieSchema);

export default movie;
