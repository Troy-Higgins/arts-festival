const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
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

// app.configure(function() {
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(cookieParser());

app.use(session({
  secret: 'made up secret',
  resave: true,
  saveUninitialized: true,
}));

//use flash middleware
app.use(flash());

//set flash variables
app.use(function(req, res, next) {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));




app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});

module.exports = app;
