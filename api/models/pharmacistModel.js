import { Schema as _Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const Schema = _Schema;

const pharmacistSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    affiliation: {
      type: String,
      required: true,
    },
    educationalBackground: {
      type: String,
      required: true,
    },
    pharmacyDegree: {
      type: String,
      required: true,
    },
    workingLicense: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
    },
    registrationApproval: {
      type: String,
      enum: ["pending", "denied", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

pharmacistSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

pharmacistSchema.methods.comparePassword = async function (
  enteredPassword,
  hashedPassword
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

export default model("Pharmacist", pharmacistSchema);