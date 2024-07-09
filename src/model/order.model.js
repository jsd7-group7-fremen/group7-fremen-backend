import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: { type: Date, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantityInOrder: { type: Number, required: true },
      amountInOrder: { type: Number, required: true },
    },
  ],
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
