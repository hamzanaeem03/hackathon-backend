import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Assuming the schema is in a models folder

const router = express.Router();

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with user details (excluding sensitive data)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
