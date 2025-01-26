import express from "express"
import Beneficiary from "../models/Beneficiary.js"

const router = express.Router()

// Add a new beneficiary
router.post("/", async (req, res) => {
  try {
    const { cnic, name, phoneNumber, address } = req.body
    const newBeneficiary = new Beneficiary({ cnic, name, phoneNumber, address })
    const savedBeneficiary = await newBeneficiary.save()
    res.status(201).json(savedBeneficiary)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all beneficiaries
router.get("/", async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find()
    res.json(beneficiaries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single beneficiary by CNIC
router.get("/:cnic", async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findOne({ cnic: req.params.cnic })
    if (!beneficiary) {
      return res.status(404).json({ message: "Beneficiary not found" })
    }
    res.json(beneficiary)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

