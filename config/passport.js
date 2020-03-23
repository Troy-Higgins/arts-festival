const mongoose = require("mongoose");

//const passportLocalMongoose = require('passport-local-mongoose');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;


// function setUp (passport) {
// const autheticateUser(email, password, done) {
// const user =
// }
//   passport.use(new LocalStrategy({usernameField: "email"}),autheticateUser)
//   passport.serializeUser((user, done), function {});
//   passport.deserializeUser((user, done), function {});
//
//
//     function(email, password, done) {
//       console.log("login attemp");
//       User.findOne({
//         email: email
//       }, function(err, user) {
//         if (err) {
//           console.log("user not found");
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false, {
//             message: 'Account is not registered'
//           });
//         }
//         if (!user.validPassword(bcrypt.password(password, User.password))) {
//           return done(null, false, {
//             message: 'Incorrect password.'
//           });
//         }
//         return done(null, user);
//       });
//     }
//   ));

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });
// };

//passport js local-stratergy module before bcrypt
module.exports = function(passport) {
    passport.use(new LocalStrategy({
          usernameField: 'email',
          passwordField: 'password',
        },
        function(email, password, done) {
          User.findOne({
            email: email
          }, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              console.log("couldn't find user");
              return done(null, false, {
                message: 'Account is not registered'
              });
            }
            bcrypt.compare(password, user.password, function(err, match) {
              if (err) {
                console.log(err);
              }
              if (!match) {
                console.log("password didn't match");
                return done(null, false, {
                  message: 'Incorrect password.'
                });
              } else {
                return done(null, user);
              };
            });
          });
        }));



      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
    };


    //passport js local-stratergy module before bcrypt
    // module.exports = function(passport) {
    //   passport.use(new LocalStrategy({
    //       usernameField: 'email',
    //       passwordField: 'password',
    //     },
    //     function(email, password, done) {
    //       User.findOne({
    //         email: email
    //       }, function(err, user) {
    //         if (err) {
    //           return done(err);
    //         }
    //         if (!user) {
    //           console.log("couldn't find user");
    //           return done(null, false, {
    //             message: 'Account is not registered'
    //           });
    //         }
    //         if (!user.validPassword((password))) {
    //           console.log("password didn't match");
    //           return done(null, false, {
    //             message: 'Incorrect password.'
    //           });
    //         }
    //         return done(null, user);
    //       });
    //     }
    //   ));
    //
    //   passport.serializeUser(function(user, done) {
    //     done(null, user.id);
    //   });
    //
    //   passport.deserializeUser(function(id, done) {
    //     User.findById(id, function(err, user) {
    //       done(err, user);
    //     });
    //   });
    // };




    // passport.use(new LocalStrategy(User.authenticate()));
    //
    // User.plugin(passportLocalMongoose);
    // module.exports = function(passport) {
    //   passport.use(
    //   new LocalStrategy({email: email})
    //   )
    // }
