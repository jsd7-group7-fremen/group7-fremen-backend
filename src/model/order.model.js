const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantityInOrder: {
        type: Number,
        required: true,
      },
      amountInOrder: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
