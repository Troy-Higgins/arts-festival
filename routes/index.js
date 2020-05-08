
/*Troy - handles routes associated with the main website such as the home page.
and enquiries*/
const express = require("express");
const router = express.Router();
const sendEmail = require("../config/nodemailer");

/*Troy - The main get request which serves the home page of the website */
router.get("/",  function(req, res) {
  res.sendFile("index.html", {root: './public/html'})
});

//Troy - route to the enquiry page.
router.get("/enquiries", function(req, res) {
  res.render("query");
});

/* Troy - Recieves the enquiry and the email that submitted it. Then
Transmit's this information to the WAF email address.*/
router.post("/enquiries", function(req, res) {
  let userEmail = req.body.email;
  let messageBody = req.body.message;
  sendEmail.submitQuery(userEmail, messageBody);
  req.flash("successMessage", "Your query has been submitted.");
  res.redirect("/enquiries");
});


module.exports = router;
