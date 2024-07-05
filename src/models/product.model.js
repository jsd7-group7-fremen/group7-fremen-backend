const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String },
  brand: { type: String },
  stock: { type: String },
  category: { type: String },
  price: { type: String },
  sizeUs: { type: String },
  color: { type: String },
  description: { type: String },
  images: { type: [String], default: [] },
});

module.exports = mongoose.model("Product", productSchema);
