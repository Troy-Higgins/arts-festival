//https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENTID,
  process.env.CLIENTSECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH
});

const accessToken = oauth2Client.getAccessToken()


let welcomeText = `Welcome to Wheatley Arts festival,

we want to thank you for creating and account and are looking forward to seeing you.

Warm regards,

WAF`


var auth = {
  type: 'oauth2',
  user: process.env.GMAIL,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  refreshToken: process.env.REFRESH,
  accessToken: accessToken
};

//set up transporter

module.exports = {
  signupEmail: function(userEmail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });
    let mailOptions = {
      from: process.env.GMAIL,
      to: userEmail,
      subject: "Account creation",
      text: welcomeText
    }
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("successly sent");
      }
    })
  },
  ticketReserveEmail: function(userEmail, ticket1ID, ticket2ID) {
let ticketInfo = "\nTicket 1 ID: " + ticket1ID;
if (typeof ticket2 !== "undefined") {
let ticketInfo = ticketInfo + "\nTicket 2 ID:" + ticket2ID;
}
let reserveText =  `Dear Sir/Madam,

This is an email confirming your reservation.` + ticketInfo;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });
    let mailOptions = {
      from: process.env.GMAIL,
      to: userEmail,
      subject: "Ticket reservation",
      text:
    }
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("successly sent");
      }
    })
  }
};

// testEmail: function() {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: auth,
//     tls: {
//       rejectUnauthorized: false
//     }
//   });
//
//   let mailOptions = {
//     from: process.env.GMAIL,
//     to: "fakemail",
//     subject: "this is a 2nd test",
//     text: "worked using special auth"
//   }
//
//   transporter.sendMail(mailOptions, function(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("successly sent");
//     }
//   })
// },
//
