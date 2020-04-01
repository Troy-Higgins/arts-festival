nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();

var auth = {
  type: 'oauth2',
  user: process.env.GMAIL,
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  refreshToken: process.env.REFRESH,
  accessToken: process.env.ACCESS
};

//set up transporter

module.exports = {
  testEmail: function() {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: auth,
    });

    let mailOptions = {
      from: process.env.GMAIL,
      to: "fakemail",
      subject: "this is a 2nd test",
      text: "worked using special auth"
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
