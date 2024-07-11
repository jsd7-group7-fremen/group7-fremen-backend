// Set Schema user in MongoDB
import mongoose from "mongoose";
const { Schema } = mongoose;
// Schema สำหรับรายการในตะกร้า
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: String, // หรือ Number ขึ้นอยู่กับประเภทของขนาดรองเท้า
    },
  },
  { _id: false }
); // ปิดการสร้าง _id อัตโนมัติสำหรับ subdocument

const userSchema = new Schema({
  fullName: { type: String, required: true }, // required for impoortant information
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  isAdmin: { type: Boolean, default: false },
  userStatus: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  }, // add deleted in enum for software deleted | default active
  createdDate: { type: Date, default: Date.now }, // ISODate
  gender: { type: String, enum: ["male", "female", "other"], required: true }, // Valid value only 3 list
  dateOfBirth: { type: Date },
  cart: [cartItemSchema]
});

export default mongoose.model("User", userSchema);