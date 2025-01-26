import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "Medical Assistance",
      "Education Assistance",
      "Financial Assistance",
      "Social Welfare",
      "Specialized Services",
    ],
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Department", DepartmentSchema);
