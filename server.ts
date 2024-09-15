import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./src/routes/routes";
import connectDB from "./src/config/database";
dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("", routes);

app.listen(process.env.PORT, () => {
  console.log(`Running http://localhost:${process.env.PORT}`);
});
