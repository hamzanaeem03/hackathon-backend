import mongoose from "mongoose";

const BeneficiarySchema = new mongoose.Schema({
  cnic: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  history: [
    {
      department: { type: String },
      purpose: { type: String },
      status: { type: String, enum: ["pending", "in-progress", "completed", "cancelled"] },
      notes: [
        {
          text: { type: String },
          createdAt: { type: Date, default: Date.now },
          createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Beneficiary", BeneficiarySchema);
