import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: "Beneficiary", required: true },
  department: {
    type: String,
    required: true,
    enum: [
      "Medical Assistance",
      "Education Assistance",
      "Financial Assistance",
      "Social Welfare",
      "Specialized Services",
    ],
  },
  purpose: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  notes: [
    {
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Token", TokenSchema);
