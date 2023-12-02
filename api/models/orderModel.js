import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const orderSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  items: [
    {
      medicine_id: {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
      },
      quantity: Number,
    },
  ],
  total_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: [
      "Cancelled",
      "Confirmed",
      "Delivered",
    ],
    required: true,
  },
  address: {
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    governate: { type: String, required: true },
    is_default: {type: Boolean},
  },
  paymentMethod: {
    type: String,
    enum: [
      "cod",
      "wallet",
      "cc",
    ],
  },
}, { timestamps: true });

export default model("Order", orderSchema);