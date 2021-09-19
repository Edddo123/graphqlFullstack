const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
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

module.exports = mongoose.model("Seller", sellerSchema);
