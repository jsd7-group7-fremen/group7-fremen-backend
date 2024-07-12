import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({});

export default mongoose.model("Cart", cartSchema);
