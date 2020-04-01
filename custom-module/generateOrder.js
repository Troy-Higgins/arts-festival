const mongoose = require("mongoose");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Order = require("../models/Order");
//maxTickets can be easily adjusted to WAF needs
const maxTickets = 1000;
//module exports the function reserveTicket
module.exports = {
  /*takes the http request response objects as well as the users email address
   and the number of tickets requird as parameters. The function then redirects the user
   to their account page and displays a flash message. This flash message
   will either be an error or success depending on the availability of tickets*/
  reserveTicket: function(req, res, userEmail, noOfTickets) {
//first the user has to be found in the users collection
    User.findOne({
      email: userEmail
    }, function(err, foundUser) {
      if (err) {
        return handleError(err);
        /*if there's no error when searching for a user
        a count of the currently reserved tickets is made.
        Currently there is no error handling if no user is found,
        as this situation should not occur due to having to be logged in
        to even access this page. To login their email would have already
        been found in the users collection */
      } else Order.countDocuments({}, function(err, count) {
        /* now a check takes place to see if their quantity of tickets wiill
        excess the available tickets. If it does not then it will order 1 tickets
        at a time. If their required tickets exceeds the available they will be redirected
        */
        if ((count + noOfTickets) <= maxTickets) {
          for (var i = 1; i <= noOfTickets; i++) {
        /* tickets are made on the fly */
            const newTicket = new Ticket({});
            newTicket.save();
            console.log(newTicket._id);
            const newOrder = new Order({
              /*To keep this as simple as possible an order uses the autogenerated
              _id field of both the user and ticket. */
              userID: foundUser._id,
              ticketID: newTicket._id
            });
            newOrder.save();
          }
          req.flash('successMessage', 'your tickets are reserved');
          res.redirect('/users/account');
        } else {
          req.flash('errorMessage', 'Sorry we are out of tickets');
          res.redirect('/users/account');
        }
      });
    });
  }
};
