import express from "express";
import { getTest } from "./openai";
import cors from "cors";
const port = 7001;
const app = express();

app.use(cors());

const router = express.Router();

router.get("", (req, res) => {
  res.send({});
});
router.post("", async (req, res) => {
  res.setHeader("Content-type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  getTest(res)
});

app.use("", router);

app.listen(port, () =>
  globalThis.console.log(`Server is running on port ${port}`)
);
