var errors = [];
const User = require("../models/User.js");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const email = require("../config/nodemailer");


module.exports = {
  createAccount: function(req, res, email, password, password2) {
    if (!email || !password) {
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
          email: email
        },
        function(err, foundUser) {
          //check if a user already exists
          if (foundUser) {
            //if they already exist
            console.log("user found");
            errors.push({
              message: "user already registered"
            });
            res.render("sign-up", {
              errors: errors,
            });
          } else {
            //success, lets make a new data model for them

            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (!err) {
                const newUser = new User({
                  email: email,
                  password: hash
                });
                console.log(newUser);
                //save the user to users collection
                newUser.save(function(err) {
                  if (!err) {
                    email.signupEmail(email);
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
  }, //end of create account
  deleteAccount: function(req, res, email) {
    User.findOne({
      email: email
    }, function(err, foundUser) {
      if (!err) {
        Order.deleteMany({
          userID: foundUser._id
        }, function(err) {
          if (!err) {
            User.deleteOne({
              _id: foundUser._id
            }, function(err) {
              if (!err) {
                req.flash('successMessage', 'Account and tickets destroyed.');
                res.redirect('/users/login');
              } else {
                console.log(err);
                req.flash('errorMessage', 'Account deletion failed.');
                res.redirect('/users/account');
              }
            });
          }
        });
      };
    });
  }
} // end of exports
