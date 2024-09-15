import mongoose from "mongoose";
import movie from "./movie";
import cast from "./cast";

const movieCastSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: movie },
  cast: { type: mongoose.Schema.Types.ObjectId, ref: cast },
});

const movieCast = mongoose.model("movie_cast", movieCastSchema);

export default movieCast;
