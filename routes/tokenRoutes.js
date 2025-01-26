import express from "express"
import Token from "../models/Token.js"
import Beneficiary from "../models/Beneficiary.js"

const router = express.Router()

// Generate a new token
router.post("/", async (req, res) => {
  try {
    const { beneficiaryCnic, department, purpose } = req.body

    // Find the beneficiary by CNIC
    const beneficiary = await Beneficiary.findOne({ cnic: beneficiaryCnic })
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" })
    }

    const newToken = new Token({
      beneficiary: beneficiary._id,
      department,
      purpose,
      status: "pending",
    })

    const savedToken = await newToken.save()
    res.status(201).json(savedToken)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all tokens
router.get("/", async (req, res) => {
  try {
    const tokens = await Token.find().populate("beneficiary")
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update token status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body
    const updatedToken = await Token.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!updatedToken) {
      return res.status(404).json({ message: "Token not found" })
    }
    res.json(updatedToken)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router

