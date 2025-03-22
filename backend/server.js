import express from "express";
import cors from "cors";
import { startNaukriBot } from "./bot.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/start", async (req, res) => {
  const { email, password, resumePath } = req.body;
  await startNaukriBot(email, password, resumePath);

  res.json("success");
});

app.listen(5000, () => console.log("Server running on port 5000"));
