const express = require("express");
const router = express.Router();
var errors = [];
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;


router.get("/register", function(req, res) {
  res.render("sign-up");
});


router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  var errors = [];
  const username = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  //const words = "hello world";
  console.log(username);
  //console.log(req.body);
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
          errors.push({
            message: "user already registered"
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

//router.post("/register", function(req, res) {
//
// router.post("/register", function(req, res) {
//   const username = req.body.name;
//   const password = req.body.password;
//   var errors = [];
//   if (!username || !password) {
//     errors.push({
//       message: "please fill in fields"
//     });
//   }
//   if (password.length < 6) {
//     errors.push({
//       message: "passwords need to be at least 6 chars"
//     });
//   }
//
//   if (errors.length > 0) {
//     res.render("register", {
//       error: errors,
//     });
//   } else {
//     res.send("pass");
//   }
// });

module.exports = router;
