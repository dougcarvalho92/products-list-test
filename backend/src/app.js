require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json()); // PARA RECEBER JSON
app.use(routes);
app.use(errors());
app.use("/images", express.static(path.join(__dirname, "../tmp/uploads")));
module.exports = app;
