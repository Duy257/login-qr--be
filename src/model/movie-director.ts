import mongoose from "mongoose";
import movie from "./movie";
import director from "./director";

const movieDirectorSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: movie },
  category: { type: mongoose.Schema.Types.ObjectId, ref: director },
});

const movieDirector = mongoose.model("movie_director", movieDirectorSchema);

export default movieDirector;
