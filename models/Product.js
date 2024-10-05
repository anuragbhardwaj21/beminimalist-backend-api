const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  uses: { type: String, required: true },
  desc: { type: String, required: true },
  additionalDesc: { type: String },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  type: { 
    type: String, 
    enum: ["skin", "hair", "bathnbody"],
    required: true 
  }
});

module.exports = mongoose.model("Product", productSchema);
