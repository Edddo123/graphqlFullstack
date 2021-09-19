const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buyerPostSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },

  buyerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BuyerPost", buyerPostSchema);
