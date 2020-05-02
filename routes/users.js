/* Troy - This is the main javascript document that handles user functionality
within the website. It handles get and post requests and the rendering of
pages */

/*Troy - Requies a list of software packages, the mongodb models, passport for
authentication, many of the config and custom modules */
const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const auth = require("../config/auth");
const isAuthenticated = auth.ensureAuthenticated;
const isNotAuthenticated = auth.isNotAuthenticated;
const orders = require("../custom-module/orderFunctions");
const account = require("../custom-module/accountFunctions");
const generateOrder = orders.reserveTicket;
const renderPage = require("../custom-module/renderPage");
const bodyParser = require("body-parser");
const email = require("../config/nodemailer");

/* Troy - Simple render of the registration page. A check takes place to see if the user
 is already logged in with isNotAuthenticated, if they are they are redirected
 to their account page (since a user should not be able to register in if already
logged in). */
router.get("/register", isNotAuthenticated, function(req, res) {
  res.render("sign-up");
});

/* Troy - Simple render of the log in page. A check takes place to see if the user
 is already logged in with isNotAuthenticated, if they are they are redirected
 to their account page (since a user should not be able to register in if already
logged in). */
router.get("/login", isNotAuthenticated, function(req, res) {
  res.render("login");
});

/*Troy - Simple get route to the ticket page, users have to be logged in to
order tickets, otherwise they are redirected to the login page. */
router.get("/tickets", isAuthenticated, function(req, res) {
  const userEmail = req.user.email;
  renderPage.renderTicketPage(req, res, userEmail);
});

/*Troy - Post route that is hit when users delete a ticket from their account
page. Calls the deleteOrder function that handles code for the deletion. */
router.post("/deleteOrder", isAuthenticated, function(req, res) {
  const userEmail = req.user.email;
  orders.deleteOrder(req, res, userEmail)
});

/*Troy - Post route that is hit when users click the delete account button from
their account page. Calls the deleteAccount function that handles code for the
deletion. */
router.post("/deleteAccount", isAuthenticated, function(req, res) {
  const userEmail = req.user.email;
  account.deleteAccount(req, res, userEmail)
});

/*Troy - Post route that handles ticket reservation. When users reserve a ticket
the generateOrder function will be called that handles the functionality. */
router.post("/ticketOrder", isAuthenticated, function(req, res) {
  const userEmail = req.user.email;
  const ticketNumber = req.body.NoOfTickets;
  const successMessage = req.body.NoOfTickets + " tickets reserved";
  generateOrder(req, res, userEmail, ticketNumber);
});

/*Troy - Get request for account page handling. A check is made to see if the user
is already logged in, if they are not they are redirected to log in page.
Account page is dynamically rendered with the renderAccountPage function  */
router.get("/account", isAuthenticated, function(req, res) {
  const userEmail = req.user.email;
  renderPage.renderAccountPage(req, res, userEmail);
});


/*Troy - Post request for log out handling. The req.logout() function deserializeUser
the user session with passport. Then they are redirected to the login page. */
router.post("/logout", function(req, res) {
  req.logout();
  req.flash("successMessage", "You have been logged out.");
  res.redirect("/users/login");
});

/*Troy - Post request for registration handling. body parser is used to recieve
the data in the contents form. This is then passed to the createAccount function
that completes validation and attempts to add them to the database. */
router.post("/register", function(req, res) {
  const username = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  account.createAccount(req, res, username, password, password2);
});

router.post('/login', function(req, res, next) {
/*Troy - Attempts to authenticate the user using the local Strategy found in the p
passport.js config file. failureflash is set to true, which allows for
flash messages that have been set in the config file to be sent with the
redirect.*/
  passport.authenticate('local', {
    successRedirect: '/users/account',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});


module.exports = router;
