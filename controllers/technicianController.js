const asyncHandler = require("express-async-handler")
const Technician = require("../models/Technician")
const Request = require("../models/Request")

// @desc    Get all technicians
// @route   GET /api/technicians
// @access  Public
const getTechnicians = asyncHandler(async (req, res) => {
  const technicians = await Technician.find({})
  res.json(technicians)
})

// @desc    Get technician by ID
// @route   GET /api/technicians/:id
// @access  Public
const getTechnicianById = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id)

  if (technician) {
    res.json(technician)
  } else {
    res.status(404)
    throw new Error("Technician not found")
  }
})

// @desc    Create a new technician
// @route   POST /api/technicians
// @access  Private/Admin
const createTechnician = asyncHandler(async (req, res) => {
  const { name, city, mobile, email, specialization } = req.body

  const technicianExists = await Technician.findOne({ email })

  if (technicianExists) {
    res.status(400)
    throw new Error("Technician already exists")
  }

  const technician = await Technician.create({
    name,
    city,
    mobile,
    email,
    specialization,
    status: "active",
  })

  if (technician) {
    res.status(201).json(technician)
  } else {
    res.status(400)
    throw new Error("Invalid technician data")
  }
})

// @desc    Update technician
// @route   PUT /api/technicians/:id
// @access  Private/Admin
const updateTechnician = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id)

  if (technician) {
    technician.name = req.body.name || technician.name
    technician.city = req.body.city || technician.city
    technician.mobile = req.body.mobile || technician.mobile
    technician.email = req.body.email || technician.email
    technician.specialization = req.body.specialization || technician.specialization
    technician.status = req.body.status || technician.status

    const updatedTechnician = await technician.save()
    res.json(updatedTechnician)
  } else {
    res.status(404)
    throw new Error("Technician not found")
  }
})

// @desc    Delete technician
// @route   DELETE /api/technicians/:id
// @access  Private/Admin
const deleteTechnician = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id)

  if (technician) {
    // Check if technician has assigned requests
    const assignedRequests = await Request.countDocuments({
      technician: req.params.id,
      status: { $in: ["assigned", "pending"] },
    })

    if (assignedRequests > 0) {
      res.status(400)
      throw new Error("Cannot delete technician with assigned requests")
    }

    await technician.deleteOne()
    res.json({ message: "Technician removed" })
  } else {
    res.status(404)
    throw new Error("Technician not found")
  }
})

// @desc    Get technician stats (assigned requests count)
// @route   GET /api/technicians/:id/stats
// @access  Private/Admin
const getTechnicianStats = asyncHandler(async (req, res) => {
  const assignedRequests = await Request.countDocuments({
    technician: req.params.id,
    status: "assigned",
  })

  const completedRequests = await Request.countDocuments({
    technician: req.params.id,
    status: "completed",
  })

  res.json({
    assignedRequests,
    completedRequests,
  })
})

module.exports = {
  getTechnicians,
  getTechnicianById,
  createTechnician,
  updateTechnician,
  deleteTechnician,
  getTechnicianStats,
}

