const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    }
  ],
  addline1: { type: String },
  addline2: { type: String },
  city: { type: String },
  pinCode: { type: String },
  state: { type: String },
  dob: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phoneNumber: { type: String },
});

module.exports = mongoose.model("User", userSchema);
