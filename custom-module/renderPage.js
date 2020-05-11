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
    /*Troy - A count of the current number of orders are made to see how
    many are available to all users */
    Order.countDocuments({}, function(err, orderCount) {
      User.findOne({
        email: email
      }, function(err, user) {
        /*Troy - A count of the number of orders or tickets that specific user
        has is made, if they have the maximum number of allocated tickets
        they cannot order more */
        Order.countDocuments({
          userID: user._id
        }, function(err, userCount) {


          if (userCount >= userMaxTickets) {
            /*Troy - A user has the maximum amount of tickets, they are redirected
            to their account page with a warning that they have as many as they can*/
            req.flash('errorMessage', 'You have already reserved the maximum number of tickets');
            res.redirect('/users/account');
          } else {
            /*Troy - render the ticket page with the amount of tickets that are
            available from the 1000 total, and how many they can order.*/
            res.render("tickets", {
              ticketsReserved: orderCount,
              reservedByUser: userCount
            });
          }

        });
      });
    });

  },


  /*Troy - This function is used to render a users account page (or dashboard if you
prefer) it includes a table which contains each ticket ID allocated to them. if
they do not have any tickets then no table is displayed.
There are 3 states of ticket numbers, either no tickets (0) , one ticket (1)
or 2 tickets (2), which is reflected by the ticketNumber variable*/
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
          /*Troy - Find any order for tickets that belong to the user.*/
          userID: foundUser._id
        }, function(err, tickets) {
          /*Troy - if they have not reserved any, set it to 0.*/
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
          /*Troy - render the account page with the ID of the tickets they have
          reserved (if any) and display the number of tickets they have
          (if any).*/
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
