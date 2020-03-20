const express = require("express");
const router = express.Router();

router.get("/register",  function(req, res) {
  res.send("register please");
});


router.get("/login",  function(req, res) {
  res.send("Login please");
});

module.exports = router;
