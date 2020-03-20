const express = require("express");
const router = express.Router();

router.get("/register",  function(req, res) {
  res.render("register");
});


router.get("/login",  function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  console.log(req.body);
  res.send("welcome");
});

module.exports = router;
