module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('errorMessage', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  isNotAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/users/account');
  }
};
