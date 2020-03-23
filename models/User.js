const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema({
  email : String,
  password: String
});

// userSchema.methods.validPassword = function(password2) {
// console.log(this.password);
//    return bcrypt.compare(password2, this.password, function (err, isMatch) {
//     if (err)  {
//       console.log(err);
//     } if (isMatch) {
//       return true
//     }
//     })
//   };
//userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
