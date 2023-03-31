import { config } from "dotenv";
config();

import cors from "cors";
import morgan from "morgan";
import routes from "./router";
import mongoose from "mongoose";
import express, { Express, Request, Response } from "express";

const app: Express = express();

mongoose
  .connect(process.env.DB_URI!, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("mongodb connected!");
  })
  .catch((err: any) => console.log(err.message));

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
        data: null,
      });
    } else {
      next();
    }
  }
);

app.use(express.urlencoded({ extended: false }));

// set up morgan logs
app.use(morgan("tiny"));

// set up routes
app.use("/api/v1/category", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
