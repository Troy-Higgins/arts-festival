/*Troy - This module contains the main two functions for reserving tickets
as well as deleting tickets. maxTickets holds an integer that can be used to hold
the max tickets WAF is offering. This can be changed with the clients request. */
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");
const email = require("../config/nodeMailer");
//Troy - maxTickets can be easily adjusted to WAF needs.
const maxTickets = 1000;
//Troy - array to hold the ordered ticket id's.
const ticketIDs = [];
//module exports the function reserveTicket
module.exports = {
    /*Troy - Reserve ticket takes the http request response objects as well as the users email address
     and the number of tickets requird as parameters. The function then redirects the user
     to their account page and displays a flash message. This flash message
     will either be an error or success depending on the availability of tickets*/
    reserveTicket: function(req, res, userEmail, noOfTickets) {
      //Troy - Firstly, the user has to be found in the users collection.
      User.findOne({
        email: userEmail
      }, function(err, foundUser) {
        if (err) {
          return handleError(err);
  /* Troy - if there's no error when searching for a user a count of the
  currently reserved  tickets (orders) is made. */
        } else Order.countDocuments({}, function(err, count) {
          /*Troy - Now a check takes place to see if their quantity of tickets will
          exceed the available tickets. If it does not then it will order 1 tickets
          at a time. If their required tickets exceeds the available they will be
          redirected */
          if ((count + noOfTickets) <= maxTickets) {
            for (var i = 1; i <= noOfTickets; i++) {
              /*Troy - Tickets are made on the fly to make new orders. */
              const newTicket = new Ticket({});
              //Troy - save the new ticket to the collection.
              newTicket.save();
              //Troy - place the new ticketID into the ticketID array.
              ticketIDs.push(newTicket._id);
              const newOrder = new Order({
                /*Troy - To keep orders as simple as possible, an order uses the
                autogenerated _id field of both the userID and ticketID. */
                userID: foundUser._id,
                ticketID: newTicket._id
              });
              //Troy - Save the ordered ticket for the user.
              newOrder.save();
            }
            /* Troy - Send a confirmation email to the users email address. Then
            redirect them with a success message. Otherwise redirect them
            with an error message. */
            email.ticketReserveEmail(userEmail, ticketIDs);
            req.flash('successMessage', 'your tickets are reserved');
            res.redirect('/users/account');
          } else {
            req.flash('errorMessage', 'Sorry we are out of tickets');
            res.redirect('/users/account');
          }
        })
      })
    },
//Troy - End of reserveTicket and beginning of deleteOrder.
    deleteOrder: function(req, res, userEmail) {
  //Troy - user the user's email address to find their id.
      User.findOne({
          email: userEmail
        }, function(err, foundUser) {
          if (err) {}
  /* Troy - Once their user id is found, any orders with that id can be found.
  The first order will be deleted that matches their id.*/
          Order.deleteOne({
            userID: foundUser._id
          }, function(err) {
            if (!err) {
              req.flash('successMessage', 'Ticket deleted.');
              res.redirect('/users/account');
            } else {
              req.flash('errorMessage', "Sorry we could not remove your ticket.");
              res.redirect('/users/account');
            }
          });
        })
      }
    };
