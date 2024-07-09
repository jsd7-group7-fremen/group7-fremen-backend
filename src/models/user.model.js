// Set Schema user in MongoDB
import mongoose from "mongoose";
const { Schema } = mongoose;

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
  createdDate: { type: Date, default: Date.now() }, // ISODate
  gender: { type: String, enum: ["male", "female", "other"], required: true }, // Valid value only 3 list
  dateOfBirth: { type: Date },
  cart: [],
});

export default mongoose.model("User", userSchema);
