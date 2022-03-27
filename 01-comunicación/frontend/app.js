const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/", express.static(__dirname + "/public"));
app.use("/api", require("./routes"));

app.get("/health", (req, res) => res.send("I am alive!"));

app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = app;
