
/*Troy - handles routes associated with the main website such as the home page. */
const express = require("express");
const router = express.Router();

/*Troy - The main get request which serves the home page of the website */
router.get("/",  function(req, res) {
  res.sendFile("index.html", {root: './public/html'})
});

module.exports = router;
