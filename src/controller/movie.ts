import commonCRUD from "./common";
import movie from "../model/movie";
import movieCast from "../model/movie-cast";
import { removeUnicode } from "../helper/text";

class MovieController extends commonCRUD {
  constructor(model: any) {
    super(model);
  }

  public create = async (req: any, res: any) => {
    try {
      const data = req.body;
      let code = generateRandomNumber();
      let check = false;
      while (check) {
        const checkCode = await this.model.countDocuments({ code: code });
        if (checkCode === 0) {
          check = true;
        } else {
          code = generateRandomNumber();
        }
      }
      const slug = removeUnicode(data.title);
      const tag = removeUnicode(`${data.title} ${data.titleEn}`);
      const newData = await this.model.create({ ...data, code, slug, tag });

      await handleMovieCast(newData._id, data.cats);
      await handleMovieDirector(newData._id, data.directors);

      return res.status(200).json(newData);
    } catch (error) {
      throw res.status(400).json(error);
    }
  };
}

async function handleMovieCast(movieId: string, castIds: Array<string>) {
  const data = castIds.map((castId) => {
    return { movie: movieId, cast: castId };
  });
  await movieCast.create(data);
}

async function handleMovieDirector(
  movieId: string,
  directorIds: Array<string>
) {
  const data = directorIds.map((directorId) => {
    return { movie: movieId, director: directorId };
  });
  await movieCast.create(data);
}

function generateRandomNumber() {
  let randomNumber = "";
  for (let i = 0; i < 6; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

export default new MovieController(movie);
