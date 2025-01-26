import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Receptionist", "Department", "Admin"],
  },
  department: {
    type: String,
    enum: [
      "Medical Assistance",
      "Education Assistance",
      "Financial Assistance",
      "Social Welfare",
      "Specialized Services",
    ],
    default: null, // Null for non-department users
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
