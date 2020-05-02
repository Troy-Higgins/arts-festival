/* Troy - custom module  that is used to render the order ticket page and the
accounts page. These are required as they are ejs pages that contain dynamic
content.

Both the account and ticket page are tempoary templates made by Troy.*/
const mongoose = require("mongoose");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");
/*Troy - The maximal amount of tickets each account can hold is two. But this
could be changed at the clients request. */
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

  },

  renderAccountPage: function(req, res, email) {
    let ticketNumber = 0;
    let ticketID1;
    let ticketID2;
    User.findOne({
      email: email
    }, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        Order.find({
          userID: foundUser._id
        }, function(err, tickets) {
          if (tickets.length == 0) {
            ticketNumber = 0;
          } else {
            if (tickets.length >= 1) {
              ticketID1 = tickets[0].ticketID;
              ticketNumber = 1;
            }
            if (tickets.length >= 2) {
              ticketID2 = tickets[1].ticketID;
              ticketNumber = 2;
            }
          }
          res.render("account", {
            user: req.user.email,
            tickets: ticketNumber,
            ticket1: ticketID1,
            ticket2: ticketID2
          });
        })
      }
    })
  }


}
