/*Troy - Simple Schema for a User. The email and password are set when a user
registers a new account successfully.

This is exportable so it can be used in other files. */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email : String,
  password: String
});
const User = mongoose.model("User", userSchema);
module.exports = User;
