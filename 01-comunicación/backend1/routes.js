const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/message", async (req, res) => {
  const pathServiceBackend2 =
    process.env.SERVICE_BACKEND2 || "http://localhost:19020/api/message";
  const response = await axios.get(pathServiceBackend2);

  const messages = {
    message01: "Hello from backend1",
    message02: response.data.message,
  };

  res.json(messages);
});

module.exports = router;
