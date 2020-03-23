const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new Schema({
  email : String,
  password: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;
