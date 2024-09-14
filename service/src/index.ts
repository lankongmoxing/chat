import express from "express";
import { getTest } from "./openai";
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config()
const port = 7001;
const app = express();

app.use(cors());

// post json数据
app.use(express.json())

const router = express.Router();

router.post("/test", (req, res) => {
  console.log(req.body);
  res.send({});
});
router.post("/session", async (req, res) => {
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  getTest(req, res)
});

app.use("", router);

app.listen(port, () =>
  globalThis.console.log(`Server is running on port ${port}`)
);
