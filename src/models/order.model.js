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
  orderStatus: {
    type: String,
    enum: ["active", "cancelled"],
    default: "active",
  },
  cancelledDate: { type: Date },
});

// Set cancelledDate only when the order status is "cancelled"
// orderSchema.pre("save", function (next) {
//   if (this.orderStatus === "cancelled" && !this.cancelledDate) {
//     this.cancelledDate = new Date();
//   }
//   next();
// });

export default mongoose.model("Order", orderSchema);
