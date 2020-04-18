const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");



const app = express();
//const router = express.router;
app.use(express.static(__dirname +"/public"));
app.set('view engine', 'ejs');

const dbKey = "mongodb://localhost:27017/WAF";
mongoose.connect(dbKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({
  secret: 'made up secret',
  resave: true,
  saveUninitialized: true,
}));
//use flash middleware
app.use(flash());

//passport config setup
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());



//set flash variables
app.use(function(req, res, next) {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));




app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});

module.exports = app;
