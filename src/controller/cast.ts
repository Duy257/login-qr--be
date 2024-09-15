import commonCRUD from "./common";
import cast from "../model/cast";

class CastController extends commonCRUD {
  constructor(model: any) {
    super(model);
  }
}

export default new CastController(cast);
