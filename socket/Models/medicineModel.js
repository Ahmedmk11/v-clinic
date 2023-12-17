import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  medType: {
    type: String,
    enum: ["countertop", "prescription"],
    default: "countertop",
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

export default model("Medicine", medicineSchema);
