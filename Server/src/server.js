const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());

module.exports = app;
