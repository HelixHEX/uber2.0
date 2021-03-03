"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const data = require("../../../data.json");
const users = require("../../../users.json");
router.get("/allrides", (req, res) => {
    const { query } = req;
    let { limit, uid } = query;
    let user;
    for (var i = 0; i < users.length; i++) {
        if (users[i].uid === uid) {
            user = true;
        }
    }
    if (user) {
        limit = parseInt(limit);
        let places = [];
        const genNum = (min, max) => {
            const num = Math.floor(Math.random() * max) + min;
            return num;
        };
        let ranum = genNum(0, data.results.length - limit);
        console.log(ranum);
        for (var i = ranum; i < (ranum + limit); i++) {
            places.push({
                time: data.results[i].Time,
                state: data.results[i].State,
                address: data.results[i].Address,
                street: data.results[i].Street,
                city: data.results[i].PuFrom
            });
        }
        res.send({ places }).status(200);
    }
    else {
        res.send({ error: "Not logged in" }).status(400);
    }
});
module.exports = router;
//# sourceMappingURL=index.js.map