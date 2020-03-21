const express = require("express");
const router = express.Router();

router.get("/register", function(req, res) {
  res.render("sign-up");
});


router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  const username = req.body.name;
  const password = req.body.password;
  var errors = [];
  if (!username || !password) {
    errors.push({
      message: "please fill in fields"
    });
  }
  if (password.length < 6) {
    errors.push({
      message: "passwords need to be at least 6 chars"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      error: errors,
    });
  } else {
    res.send("pass");
  }
});
//
// router.post("/register", function(req, res) {
//   const username = req.body.name;
//   const password = req.body.password;
//   var errors = [];
//   if (!username || !password) {
//     errors.push({
//       message: "please fill in fields"
//     });
//   }
//   if (password.length < 6) {
//     errors.push({
//       message: "passwords need to be at least 6 chars"
//     });
//   }
//
//   if (errors.length > 0) {
//     res.render("register", {
//       error: errors,
//     });
//   } else {
//     res.send("pass");
//   }
// });

module.exports = router;
