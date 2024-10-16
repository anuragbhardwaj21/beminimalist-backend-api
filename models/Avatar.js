const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shape: {
      type: String,
      enum: ["circle", "rounded", "square"],
      default: "circle",
    },
    sex: {
      type: String,
      enum: ["man", "woman"],
      required: true,
    },
    faceColor: {
      type: String,
      default: "#F9C9B6",
    },
    earSize: {
      type: String,
      enum: ["small", "big"],
      default: "small",
    },
    hairColor: {
      type: String,
      default: "#000000",
    },
    hairStyle: {
      type: String,
      enum: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
      default: "normal",
    },
    hairColorRandom: {
      type: Boolean,
      default: false,
    },
    hatColor: {
      type: String,
      default: "#D2EFF3",
    },
    hatStyle: {
      type: String,
      enum: ["none", "beanie", "turban"],
      default: "none",
    },
    eyeStyle: {
      type: String,
      enum: ["circle", "oval", "smile"],
      default: "circle",
    },
    glassesStyle: {
      type: String,
      enum: ["none", "round", "square"],
      default: "none",
    },
    noseStyle: {
      type: String,
      enum: ["short", "long", "round"],
      default: "short",
    },
    mouthStyle: {
      type: String,
      enum: ["laugh", "smile", "peace"],
      default: "smile",
    },
    shirtStyle: {
      type: String,
      enum: ["hoody", "short", "polo"],
      default: "hoody",
    },
    shirtColor: {
      type: String,
      default: "#6BD9E9",
    },
    bgColor: {
      type: String,
      default: "#FFFFFF",
    },
    isGradient: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Avatar", avatarSchema);
