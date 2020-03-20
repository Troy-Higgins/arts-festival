const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
//const router = express.router;
app.use(express.static(__dirname +"/public"));
app.set('view engine', 'ejs');
//KEY FOR ATLAST
//const dbKey = require("/config/keys").mongoKey;

const dbKey = "mongodb://localhost:27017/WAF";
mongoose.connect(dbKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));




app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});

module.exports = app;
