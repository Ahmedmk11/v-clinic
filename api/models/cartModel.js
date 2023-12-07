import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const cartSchema = new Schema({
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
});

export default model("Cart", cartSchema);
