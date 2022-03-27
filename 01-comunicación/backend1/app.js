const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/api", require("./routes"));

app.get("/health", (req, res) => res.send("I am alive!"));

module.exports = app;
