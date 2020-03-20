const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
//const router = express.router;
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));




app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});

module.exports = app;
