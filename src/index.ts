import "reflect-metadata";
import "dotenv-safe/config";

import express from "express";
import fetch from "node-fetch";
import cron from "cron";
import morgan from "morgan";
// const path = require("path");

const rides = require("./routes/rides");
const user = require("./routes/user");

const main = () => {
  const app = express();

  app.use(express.json());

  // Use morgan
  app.use(morgan("dev"));

  // app.use(express.static(path.join(__dirname, "../build")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/rides", rides);
  app.use("/api/user", user);

  app.get("/", (_, res: express.Response) => {
    res.send("Hello world");
  });
  
  const cronJob = new cron.CronJob("0 */25 * * * *", () => {
    fetch("https://uber2.0.herokuapp.com/")
      .then((res: any) =>
        console.log(`response-ok: ${res.ok}, status: ${res.status}`)
      )
      .catch((error: any) => console.log(error));
  });

  cronJob.start();
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  });
};

main();
