const express = require("express");
const router = express.Router();
  var errors = [];
router.get("/register", function(req, res) {
  res.render("sign-up");
});


router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  var errors = [];
  const username = req.body.email;
  const password = req.body.password;
  const words = "hello world";

  console.log(req.body);
  if (!username || !password) {
    errors.push({
      message: "please fill in fields"
    });
  }
  if (password.length < 6) {
    errors.push({
      message: "passwords need to be at least 6 chars"
    });
    console.log("passwords need to be at least 6 chars");
  }
console.log(errors.length);
  if (errors.length > 0) {
    res.render("sign-up", {
     errors: errors,
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
