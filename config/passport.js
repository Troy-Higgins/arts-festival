/*Troy - This module contains the configuration code that allows passportjs
to a LocalStrategy of username and password to authenticate a user.

This module also contains the passportjs method serializeUser and deserializeUser,
these are used to serialise the user for the session once they log in. Then
when they logout their session can be deserialised.

Much of code in this module is based on the passportjs examples found in their
documentation at -http://www.passportjs.org/docs/configure/
*/


//Troy - Mongoose required whenever working with mongoDB documents.
const mongoose = require("mongoose");
//Troy - need the use of the User model to find users.
const User = require("../models/User");
/*Troy - bcrypt required for the compare function. */
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;


/*Troy - Takes passport object from app.js and exports the config to app.js.
Uses the LocalStrategy, searches for the user using their id, if they are found
it checks their password using bcrypt.compare*/
module.exports = function(passport) {
  //Troy - set the stratergy fields to simpler terms.
    passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
        },
        /*Troy - verify call back takes the supplied, password
        and the passportjs done */
        function(email, password, done) {
          //Troy - search for the user by using the supplied email.
          User.findOne({
            email: email
          }, function(err, user) {
            if (err) {
              return done(err);
            }
            /*Troy - if no user found return no error and no user with an
            message that will be used as a flash message.*/
            if (!user) {
              console.log("couldn't find user");
              return done(null, false, {
                message: 'Account is not registered'
              });
            }
            //Troy - compare the supplied password with the stored one.
            bcrypt.compare(password, user.password, function(err, match) {
              if (err) {
                console.log(err);
              }
              //Troy - if no match return done with no error and user.
              if (!match) {
                console.log("password didn't match");
                return done(null, false, {
                  message: 'Incorrect password.'
                });
              } else {
                //Troy - Great the user was found!
                return done(null, user);
              };
            });
          });
        }));


/*Troy - SerializeUser is used to serialise the authetnicated user to the session
deserialised does the opposite of this, this is called when the user logs out.  */
      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
    };


    
