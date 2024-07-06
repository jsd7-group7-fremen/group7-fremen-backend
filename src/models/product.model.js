import mongoose from "mongoose";

const { Schema } = mongoose;

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

export default mongoose.model("Product", productSchema);
