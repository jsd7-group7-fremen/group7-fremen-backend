import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  productName: { type: String },
  quantityInStock: { type: Number },
  unitPrice: { type: Number },
  brand: { type: String },
  color: { type: String },
  sizeUs: { type: String },
  description: { type: String },
  productImage: {
    isometric: { type: String },
    side: { tyep: String },
    top: { type: String },
    rear: { type: String },
    front: { type: String },
    bottom: { type: String },
  },
  category: { type: String },
  productStatus: { type: String },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("product", productSchema);
