import commonCRUD from "./common";
import director from "../model/director";
// import director from "../model/movie";

class DirectorController extends commonCRUD {
  constructor(model: any) {
    super(model);
  }
}

export default new DirectorController(director);
