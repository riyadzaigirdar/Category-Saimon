import cors from "cors";
import { config } from "dotenv";
import express, { Express, Request, Response, Errback } from "express";

config();

const app: Express = express();

process.on("uncaughtException", (err) => {
  console.log("error me", err);
  process.exit(0);
});

// allow all cors
app.use(cors());

// check for invalid json
app.use(
  express.json(),
  (err: any, req: Request, res: Response, next: CallableFunction) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "failed",
        msg: "Invalid json",
      });
    } else {
      next();
    }
  }
);

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server ok is running at http://localhost:${port}`);
});
