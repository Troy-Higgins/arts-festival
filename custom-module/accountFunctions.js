/*Troy - accountFunctions contains two main methods, createAccount and
deleteAccount which undertake the main steps in creating and deleting accounts.

Originally the code in createAccount was in the users.js file.


*/
//Troy - errors is an erray that holds error messages.
var errors = [];
const User = require("../models/User.js");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
//Troy - use 10 salt rounds when using the bcrypt algorithm
const saltRounds = 10;
const email = require("../config/nodemailer");

//Troy - Both the functions are exports so they can be used in other files.
module.exports = {
  /*Troy - createAccount takes the req, res objects as well as supplied
  email, password and password2 fields from the register form in register.ejs.*/
  createAccount: function(req, res, email, password, password2) {
    //Troy - first check to makesure both email and password are populated.
    if (!email || !password) {
      //Troy - if one is empty, create message to fill them in next time.
      errors.push({
        message: "Please fill in fields."
      });
    }
    //Troy - Passwords have a requirement to be at least 6 characters long.
    if (password.length < 6) {
      errors.push({
        message: "Passwords need to be at least 6 characters."
      });
    }
    //Troy - Next a check is made to see if both the password fields match.
    if (password != password2) {
      errors.push({
        message: "Passwords do not match."
      });
    }
    /* Troy - if there are any errors render the sign in page again, but this time
     with any errors that occured. These will be displayed as dismissable warnings.*/
    if (errors.length > 0) {
      res.render("sign-up", {
        errors: errors,
      });
    } else {
      //Troy - Great form details pass validation!
      User.findOne({
          email: email
        },
        function(err, foundUser) {
          //Troy - Check to see if user with that email already exists.
          if (foundUser) {
            //Troy - If they already exist, push a warning message.
            console.log("user found");
            errors.push({
              message: "user already registered"
            });
            res.render("sign-up", {
              errors: errors,
            });
          } else {

            /*Troy - If no user is found a hash of their password needs to created
            using the bcrypt.hash function. Then a new user document is created
            with the help of the User schema.  */

            bcrypt.hash(password, saltRounds, function(err, hash) {
              if (!err) {
                const newUser = new User({
                  email: email,
                  password: hash
                });
                console.log(newUser);
                //Troy - now save the new user tot he database.
                newUser.save(function(err) {
                  if (!err) {
        /*Troy - if there are no errors, send them a confirmation email with
        nodemailer and redirect them to the login page with a success flash
        message that they now have an account. */
                    email.signupEmail(email);
                    req.flash('successMessage', 'You now have an account.');
                    res.redirect("/users/login");
                  } else {
                    console.log("save error");
                  }
                });
              } else {
                //Troy - if hashing fails, log the error.
                console.log(err);
              }
            });
          }
        });
    }
  },
//Troy - end of createAccount function and start of deleteAccount function.
  deleteAccount: function(req, res, email) {
    //Troy - find the account that needs deleting.
    User.findOne({
      email: email
    }, function(err, foundUser) {
  /*Troy - if no erros found, delete any of the orders associated with the account. */
      if (!err) {
        Order.deleteMany({
          userID: foundUser._id
        }, function(err) {
          if (!err) {
    //Troy - once the orders are removed, then the account can be deleted.
            User.deleteOne({
              _id: foundUser._id
            }, function(err) {
              if (!err) {
    //Troy - if successful, redirect the user to the login page with message.
                req.flash('successMessage', 'Account and tickets destroyed.');
                res.redirect('/users/login');
              } else {
      /* Troy - if an error occured, log it, then redirect the user to their
      account page with a generic error. */
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
}
