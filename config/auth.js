/* Troy - This module contains two functions that utilise the passportjs
functions isAuthenticated, this checks the response object
isAuthenticated method response.

The isAuthenticated is set to true once the user logins in
and the passport js method passport.authenticate method is called
 */
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      //Troy - if they are authenticated, let the user proceed as expected.
      return next();
    }
    /*Troy - if they are not authetnicated, redirect them to the login page
    with a warning to inform them that they need to be logged in. */
    req.flash('errorMessage', 'Please log in to view that resource');
    res.redirect('/users/login');
  },

  /*Troy - this function is basically the reverse of isAuthenticated.
  checks to see if user is logged in before trying to access resources
  designed for users who are NOT logged in */
  isNotAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    //Troy - redirected to their account page if they are already logged in
    res.redirect('/users/account');
  }
};
