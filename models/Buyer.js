const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Buyer", buyerSchema);
