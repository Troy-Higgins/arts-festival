/*Troy - This is the core javascript file which is used to start the application.
Starts the Node Express server on port 3000 and is exported for use in other files.
This file is also used to load express middleware; see -
https://expressjs.com/en/guide/using-middleware.html */
const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const ejs = require("ejs");
//const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
require('dotenv').config();


/*Troy - use the term app for the express server, this is common practice in
node. */
const app = express();
//Troy - set the file route for the static documents.
app.use(express.static(__dirname +"/public"));
//Troy - use of ejs for generating dynamic pages.
app.set('view engine', 'ejs');

//Troy - dbKey can be used to hold the local server, or the cloud Atlas DB server
//const dbKey = "mongodb://localhost:27017/WAF";

const dbKey = process.env.MONGO;


/*Troy - establish connection to mongoDB. With is achieved with the mongoose
driver. */
mongoose.connect(dbKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*Troy - Express server will need bodyParser so that the request object's body
can be accessed. */
app.use(bodyParser.urlencoded({
  extended: true
}));

//Troy - use of sessions in express server established below.
app.use(session({
  secret: 'made up secret',
  resave: true,
  saveUninitialized: true,
}));

//Troy - express server will be using flash messages for alerts.
app.use(flash());

//Troy - passportjs configuration setup. This is used for authetnicating users.
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());



//Troy - Establish the different flash message types that will be used.
app.use(function(req, res, next) {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error");
  next();
});

/*Troy - initialise the main routes the server will be using based on the
imports from index.js and users.js */
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));



/*Troy - Spool up the server on port 3000, which logs a success message in
the console. */
app.listen(3000, function() {
  console.log("Server started and listening on port 3000");
});

module.exports = app;
