const express = require("express");
const router = express.Router();
var errors = [];
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


router.get("/register", isNotAuthenticated, function(req, res) {
  res.render("sign-up");
});


router.get("/login", isNotAuthenticated, function(req, res) {
  res.render("login");
});

router.get("/tickets", isAuthenticated, function(req, res) {
  // const userEmail = req.user.email;
  // Order.countDocuments({}, function(err, count) {
  //  Order.countDocuments({userID : userEmail }, function(err, count) {}
  //   res.render("tickets", {ticketCount : count});
  const userEmail = req.user.email;
  renderPage.renderTicketPage(req, res, userEmail);
});


router.post("/deleteOrder", isAuthenticated, function(req, res) {
      const userEmail = req.user.email;
      orders.deleteOrder(req, res, userEmail)
    });

    router.post("/ticketOrder", isAuthenticated, function(req, res) {
      //req.flash("successMessage", "you have logged out");
      //console.log(req.user);
      const userEmail = req.user.email;
      const ticketNumber = req.body.NoOfTickets;
      const successMessage = req.body.NoOfTickets + " tickets reserved";
      generateOrder(req, res, userEmail, ticketNumber);
      //req.flash("successMessage", successMessage);
      //res.redirect("/users/account");
    });


    router.get("/account", isAuthenticated, function(req, res) {
      //email.testEmail();
      const userEmail = req.user.email;
      renderPage.renderAccountPage(req, res, userEmail);
    });

    router.post("/logout", function(req, res) {
      req.logout();
      req.flash("successMessage", "you have logged out");
      res.redirect("/users/login");
    });

    router.post("/register", function(req, res) {
      var errors = [];
      const username = req.body.email;
      const password = req.body.password;
      const password2 = req.body.password2;
      account.createAccount(req, res, username, password, password2);
    });

    router.post('/login', function(req, res, next) {
      passport.authenticate('local', {
        successRedirect: '/users/account',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next)
    });


    module.exports = router;
