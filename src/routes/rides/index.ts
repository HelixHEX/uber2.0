import express from "express";

const router = express.Router();

const data = require("../../../data.json");
const users = require("../../../users.json");

router.get("/allrides", (req: express.Request, res: express.Response) => {
  const { query } = req;
  let { limit, uid } = query as any;

  let user;
  for (var i = 0; i < users.length; i++) {
    if (users[i].uid === uid) {
      user = true;
    }
  }

  if (user) {
    limit = parseInt(limit);

    let places = [];

    const genNum = (min: number, max: number) => {
      const num = Math.floor(Math.random() * max) + min;
      return num;
    };

    let ranum = genNum(0, data.results.length - limit);
    console.log(data.results.length);
    for (var i = ranum; i < ranum + limit; i++) {
      places.push({
        time: data.results[i].Time,
        state: data.results[i].State,
        address: data.results[i].Address,
        Street: data.results[i].Street,
      });
    }

    res.send({ ranum, length: places.length, places }).status(200)
  } else {
    res.send({error: "Not logged in"}).status(400);
  }
});

module.exports = router;
