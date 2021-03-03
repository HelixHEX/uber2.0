"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cron_1 = __importDefault(require("cron"));
const morgan_1 = __importDefault(require("morgan"));
const rides = require('./routes/rides');
const user = require('./routes/user');
const main = () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/api/rides', rides);
    app.use('/api/user', user);
    const cronJob = new cron_1.default.CronJob("0 */25 * * * *", () => {
        node_fetch_1.default("https://travelroulette.herokuapp.com/")
            .then((res) => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
            .catch((error) => console.log(error));
    });
    cronJob.start();
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map