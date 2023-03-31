import cors from "cors";
import routes from "./router";
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";

config();

const app: Express = express();

// allow all cors
app.use(cors());

// check for invalid json and decode url
app.use(
  express.json(),
  (err: any, _: Request, res: Response, next: CallableFunction) => {
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

app.use("api/v1/category", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
