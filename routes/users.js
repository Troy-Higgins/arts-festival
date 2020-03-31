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
const genOrder = require("../custom-module/generateOrder");
const generateOrder = genOrder.reserveTicket;
const bodyParser = require("body-parser");


router.get("/register", isNotAuthenticated, function(req, res) {
  res.render("sign-up");
});


router.get("/login", isNotAuthenticated, function(req, res) {
  res.render("login");
});

router.get("/tickets", isAuthenticated, function(req, res) {
Order.countDocuments({}, function(err, count) {
//  Order.countDocuments({_id : }, function(err, count) {}
  res.render("tickets", {ticketCount : count});
});
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
  res.render("account", {
      user: req.user.email
  });
});

router.post("/logout", function(req, res) {
  req.logout();
  req.flash("successMessage", "you have logged out");
  res.redirect("/users/login");
});

router.post("/register",  function(req, res) {
  var errors = [];
  const username = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  if (!username || !password) {
    errors.push({
      message: "please fill in fields"
    });
  }
  if (password.length < 6) {
    errors.push({
      message: "passwords need to be at least 6 chars"
    });
    console.log("passwords need to be at least 6 chars");
  }
  if (password != password2) {
    errors.push({
      message: "passwords do not match"
    });
  }
    if (errors.length > 0) {
      res.render("sign-up", {
        errors: errors,
      });
    } else {
    //Form details appear valid!
    User.findOne({
        email: username
      },
      function(err, foundUser) {
        //check if a user already exists
        if (foundUser) {
          //if they already exist
          console.log("user found");
          errors.push({
            message: "user already registered"
          }
        );
        res.render("sign-up", {
          errors: errors,
        });
        } else {
          //success, lets make a new data model for them

          bcrypt.hash(password, saltRounds, function(err, hash) {
            if (!err) {
              const newUser = new User({
                email: username,
                password: hash
              });
              console.log(newUser);
              //save the user to users collection
              newUser.save(function(err) {
                if (!err) {
                  req.flash('successMessage', 'You now have an account');
                  res.redirect("/users/login");
                } else {
                  console.log("save error");
                }
              });
            } else {
              //if hash fails then log the result
              console.log(err);
            }
          });
        }
      });
  }
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/users/account',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
});


module.exports = router;
