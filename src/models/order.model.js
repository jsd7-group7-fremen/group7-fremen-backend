import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({});

export default mongoose.model("Order", orderSchema);
