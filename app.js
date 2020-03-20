const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});
