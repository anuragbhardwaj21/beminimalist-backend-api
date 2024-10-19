const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    addline1: { type: String, required: true },
    addline2: { type: String },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
