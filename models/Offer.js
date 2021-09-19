const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offerSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  offeredPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Offer", offerSchema);
