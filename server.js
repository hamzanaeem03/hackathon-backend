import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import beneficiaryRoutes from "./routes/beneficiaryRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/beneficiaries", beneficiaryRoutes);
app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
