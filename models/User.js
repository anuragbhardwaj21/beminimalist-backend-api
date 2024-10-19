const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    token: { type: String, default: null },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: "Avatar" },
    dob: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
