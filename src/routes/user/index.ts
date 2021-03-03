import express from "express";

const router = express.Router();

const users = require("../../../users.json");

const argon2 = require("argon2");

const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

router.get("/signup", async (req: express.Request, res: express.Response) => {
  let tempUsers = users;
  const { query } = req;
  const { username, password } = query;

  let hashPass = await argon2.hash(password);
  let userExists;
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      userExists = true;
    }
  }
  if (userExists) {
    res.send({ error: "User exists" }).status(400);
  } else {
    const user = {
      uid: uuidv4(),
      username,
      password: hashPass
    }
    tempUsers.push(user);
    fs.writeFile("users.json", JSON.stringify(tempUsers), function (err:any) {
      if (err) throw err;
      console.log("complete!");
    });
    res.send({success: true, uid: user.uid, username: user.uid})
  }
});

router.get("/login", async (req: express.Request, res: express.Response) => {
  const { query } = req;
  const { username, password } = query;

  let user;
  for (var i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      user = users[i];
    }
  }

  if (user) {
    let verify = await argon2.verify(user.password, password);
    if (verify) {
      res.send({ success: true, uid: user.uid, username: user.username }).status(200);
    } else {
      res.send({ error: "Incorrect username/password" }).status(400);
    }
  } else {
    res.send({ error: "Incorrect username/password" }).status(400);
  }
});
module.exports = router;
