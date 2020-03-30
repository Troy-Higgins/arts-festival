const mongoose = require("mongoose");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");
const maxTickets = 1000;
module.exports = {
  reserveTicket: function(req, res, userEmail, noOfTickets) {
    User.findOne({
      email: userEmail
    }, function(err, foundUser) {
      if (err) {
        return handleError(err);
      } else Order.countDocuments({}, function(err, count) {
        if (count < maxTickets) {
          const newTicket = new Ticket({});
          newTicket.save();
          console.log(newTicket._id);
          const newOrder = new Order({
            userID: foundUser._id,
            ticketID: newTicket._id
          });
          newOrder.save();
          req.flash('successMessage', 'your tickets are reserved');
          res.redirect('/users/account');
        } else {
          req.flash('errorMessage', 'Sorry we are out of tickets');
          res.redirect('/users/account');
        }
      })
    })
  }
}
