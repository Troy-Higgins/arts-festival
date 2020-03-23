const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
});
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
