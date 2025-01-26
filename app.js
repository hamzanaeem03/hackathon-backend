import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import loginRoute from "./routes/login.js"; // Adjust path as needed

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// Connect to MongoDB using the URI from the .env file
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", loginRoute);

// Start the server using the port from the .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
