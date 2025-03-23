import { startNaukriBot } from "./bot.js";
import dotenv from "dotenv";
dotenv.config();

startNaukriBot(
  process.env.EMAIL,
  process.env.PASSWORD,
  process.env.RESUME_PATH
);
