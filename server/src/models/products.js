const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  discountPrice: Number,
  category: String,
  image: String,
  isOffer: {
    type: Boolean,
    default: false
  },
  ingredients: [String]
});

module.exports = mongoose.model("Product", ProductSchema);
