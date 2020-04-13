const mongoose = require("mongoose");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");
const userMaxTickets = 2;

module.exports = {
  renderTicketPage: function(req, res, email) {
    Order.countDocuments({}, function(err, orderCount) {
      User.findOne({
        email: email
      }, function(err, user) {
        Order.countDocuments({
          userID: user._id
        }, function(err, userCount) {


          if (userCount >= userMaxTickets) {
            req.flash('errorMessage', 'You have already reserved the maximum number of tickets');
            res.redirect('/users/account');
          } else {
            res.render("tickets", {
              ticketsReserved: orderCount,
              reservedByUser: userCount
            });
          }

        });
      });
    });

  }
}
