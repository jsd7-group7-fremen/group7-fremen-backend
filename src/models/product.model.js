import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  quantityInStock: { type: Number, required: true },
  unitPrice: { type: Number, rquired: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  sizeUs: { type: String, required: true },
  description: { type: String },
  productImages: {
    isometric: { type: String },
    side: { type: String },
    top: { type: String },
    rear: { type: String },
    front: { type: String },
    bottom: { type: String },
  },
  category: { type: [String], required: true },
  productStatus: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
