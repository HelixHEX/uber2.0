"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users = require("../../../users.json");
const argon2 = require("argon2");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
router.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let tempUsers = users;
    const { query } = req;
    const { username, password } = query;
    let hashPass = yield argon2.hash(password);
    let userExists;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            userExists = true;
        }
    }
    if (userExists) {
        res.send({ error: "User exists" }).status(400);
    }
    else {
        const user = {
            uid: uuidv4(),
            username,
            password: hashPass
        };
        tempUsers.push(user);
        fs.writeFile("users.json", JSON.stringify(tempUsers), function (err) {
            if (err)
                throw err;
            console.log("complete!");
        });
        res.send({ success: true, uid: user.uid, username: user.uid });
    }
}));
router.get("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const { username, password } = query;
    let user;
    for (var i = 0; i < users.length; i++) {
        if (username === users[i].username) {
            user = users[i];
        }
    }
    if (user) {
        let verify = yield argon2.verify(user.password, password);
        if (verify) {
            res.send({ success: true, uid: user.uid, username: user.username }).status(200);
        }
        else {
            res.send({ error: "Incorrect username/password" }).status(400);
        }
    }
    else {
        res.send({ error: "Incorrect username/password" }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map