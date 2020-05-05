/* Troy - Primary module for handling emails from the wheatley arts Festival
account. This is primarily achieved with the nodemailer package.
The use of oauth2 was used to authenticate the arts festival email account with
google so to allow the app to send emails.

To achieve this, a guide by Nick Roach on medium.com was followed
-https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
*/
nodemailer = require("nodemailer");
//Troy - use of the SMTP transport protocol
var smtpTransport = require('nodemailer-smtp-transport');
//Troy - require require("dotenv").config(); to provide access to .env variables
require("dotenv").config();
//Troy - {google} = require("googleapis"); package provides googleapi functions
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

/*Troy - establish OAuth2 object using clientID, client secret
which were developed when creating a google developer project.
This required to obtain an access token.*/
const oauth2Client = new OAuth2(
  process.env.CLIENTID,
  process.env.CLIENTSECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH
});
/*Troy - obtain the accessToken so the app can send emails with the
 wheatley arts festival gmail account*/
const accessToken = oauth2Client.getAccessToken();

let ticketInfo ="";
//Troy - create the welcome email body.
let welcomeText = `Welcome to Wheatley Arts festival,

we want to thank you for creating and account and are looking forward to seeing you.

Warm regards,

WAF`

//Troy - below array sets the authentication details.
var auth = {
  type: 'oauth2',
  user: process.env.GMAIL,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  refreshToken: process.env.REFRESH,
  accessToken: accessToken
};

//Troy - Transporters are used to establish how the email will be sent.

module.exports = {
  //Troy - signupEmail is used to send the introductory email upon account creation.
  //Troy - user email is the email address of the newly registered account.
  signupEmail: function(userEmail) {

    //Troy - auth is set using the previously established auth array of credentials.
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });
    //Troy - set the contents of the email, with the already made body.
    let mailOptions = {
      from: process.env.GMAIL,
      to: userEmail,
      subject: "Account creation",
      text: welcomeText
    }
    /*Troy - .sendMail is the method to actually send the email, using the
    the previously established criteria */
    transporter.sendMail(mailOptions, function(err, data) {
//Troy - console log if successful, or the error, this aids in bug testing.
      if (err) {
        console.log(err);
      } else {
        console.log("successly sent");
      }
    })
  },

/* Troy - ticketReserveEmail is used to email a user whenever they reserve tickets.
Effort is made to send the details of both tickets in the same email if the user
books to tickets at once.

Function takes the parameter tickets as an array of ticket ID's that the user
has just ordered.
The other parameter userEmail is the email address of the user who reserved tickets. */
 ticketReserveEmail: function(userEmail, tickets) {
ticketInfo = "\nTicket 1 ID: " + tickets[0];
//Troy - if they user has booked two tickets, add the 2nd one into the email.
if (tickets.length == 2) {
ticketInfo = ticketInfo + "\nTicket 2 ID: " + tickets[1];
}
//Troy -  Below is the main body of the ticket reservation confirmation email.
let reserveText =  `Dear Sir/Madam,

This is an email confirming your reservation.
` + ticketInfo +
`
Kind regards,
Wheatley Arts Festival`;
//Troy - establish the transporter to send the email.
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });
//Troy - set the contents and subject of the email.
    let mailOptions = {
      from: process.env.GMAIL,
      to: userEmail,
      subject: "Ticket reservation",
      text: reserveText
    }
    //Troy - Below method to send the email with the above details.
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log(err);
      } else {
//Troy - console log if successful, or the error, this aids in bug testing.
        console.log("successfully sent");
      }
    })
  },

/*Troy - Email the WAF email account with the user query
include the user email so a response can be made. */


  submitQuery: function(userEmail, message) {
    //Troy - message body includes the users query.
let messsageBody = message+ `

From  ` + userEmail;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });

    let mailOptions = {
      from: process.env.GMAIL,
      to: process.env.GMAIL,
      subject: "query",
      text: messsageBody
    }

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("successfully sent");
      }
    })
  },



};
