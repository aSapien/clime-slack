"use strict";
// tslint:disable:no-implicit-dependencies
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const Path = require("path");
const BodyParser = require("body-parser");
const express = require("express");
const clime_1 = require("clime");
const __1 = require("..");
let cli = new clime_1.CLI('/', Path.join(__dirname, 'commands'));
let shim = new __1.SlackShim(cli /*, [token]*/);
let app = express();
app.use(BodyParser.urlencoded({
    extended: false,
}));
app.post('/api/slack/command', async (req, res) => {
    let result = await shim.execute(req.body);
    res.json(result);
});
app.listen(10047);
//# sourceMappingURL=main.js.map