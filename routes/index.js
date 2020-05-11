
/*Troy - handles routes associated with the main website such as the home page.
and enquiries*/
const express = require("express");
const router = express.Router();
const sendEmail = require("../config/nodemailer");

/*Troy - The main get request which serves the home page of the website */
router.get("/",  function(req, res) {
  res.sendFile("index.html", {root: './public/html'})
});

/*Troy - The main get request which serves the home page of the website */
router.get("/index.html",  function(req, res) {
  res.sendFile("index.html", {root: './public/html'})
});

//Troy - route to the enquiry page.
router.get("/contact.html", function(req, res) {
  res.render("query");
});

/* Troy - Recieves the enquiry and the email that submitted it. Then
Transmit's this information to the WAF email address.*/
router.post("/enquiries", function(req, res) {
  let userEmail = req.body.email;
  let messageBody = req.body.message;
  sendEmail.submitQuery(userEmail, messageBody);
  req.flash("successMessage", "Your query has been submitted.");
  res.redirect("/");
});

//Troy - route to the privacy policy page.
router.get("/privacy-policy.html", function(req, res) {
  res.sendFile("privacy-policy.html" , {root: './public/html'});
});



//Troy - route to the dancing event.
router.get("/dancing.html", function(req, res) {
  res.sendFile("dancing.html" , {root: './public/html'});
});


//CHANGE CSS BELOW
//Troy - route to about us.
router.get("/about-us.html", function(req, res) {
  res.sendFile("about-us.html" , {root: './public/html'});
});


//Troy - route to the terms and conditions.
router.get("/terms-conditions.html", function(req, res) {
  res.sendFile("terms-conditions.html" , {root: './public/html'});
});


//Troy - route to the music event.
router.get("/music.html", function(req, res) {
  res.sendFile("/music.html" , {root: './public/html'});
});


//Troy - route to the painting event.
router.get("/painting.html", function(req, res) {
  res.sendFile("/painting.html" , {root: './public/html'});
});

//Troy - route to the sculpture event.
router.get("/sculpture.html", function(req, res) {
  res.sendFile("/sculpture.html" , {root: './public/html'});
});

//Troy - route to the ceramic-art event.
router.get("/ceramic-art.html", function(req, res) {
  res.sendFile("/ceramic-art.html" , {root: './public/html'});
});


//Troy - route to the conceptual-art event.
router.get("/conceptual-art.html", function(req, res) {
  res.sendFile("/conceptual-art.html" , {root: './public/html'});
});

//Troy - route to the sculpture event.
router.get("/sculpture.html", function(req, res) {
  res.sendFile("/sculpture.html" , {root: './public/html'});
});







module.exports = router;
