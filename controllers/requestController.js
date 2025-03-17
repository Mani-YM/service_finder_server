const asyncHandler = require("express-async-handler")
const Request = require("../models/Request")
const Technician = require("../models/Technician")

// @desc    Create a new service request
// @route   POST /api/requests
// @access  Private
const createRequest = asyncHandler(async (req, res) => {
  console.log(req);
  
  const { requestInfo, description, address, contact, preferredDate } = req.body

  const request = await Request.create({
    requestInfo,
    description,
    address,
    contact,
    preferredDate,
    user: req.user._id,
    // user: req.user ? req.user._id : null,
    status: "pending",
  })

  if (request) {
    res.status(201).json(request)
  } else {
    res.status(400)
    throw new Error("Invalid request data")
  }
})

// @desc    Get all requests
// @route   GET /api/requests
// @access  Private/Admin
const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({}).populate("user", "name email").populate("technician", "name mobile email")

  res.json(requests)
})

// @desc    Get user requests
// @route   GET /api/requests/myRequests
// @access  Private
const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ user: req.user._id }).populate("technician", "name mobile email")

  res.json(requests)
})

// @desc    Get request by ID
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate("user", "name email")
    .populate("technician", "name mobile email")

  if (request) {
    res.json(request)
  } else {
    res.status(404)
    throw new Error("Request not found")
  }
})

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private/Admin
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status, technicianId } = req.body

  const request = await Request.findById(req.params.id)

  if (!request) {
    res.status(404)
    throw new Error("Request not found")
  }

  // Update status
  request.status = status || request.status

  // If assigning a technician
  if (status === "assigned" && technicianId) {
    const technician = await Technician.findById(technicianId)

    if (!technician) {
      res.status(404)
      throw new Error("Technician not found")
    }

    request.technician = technicianId
    request.assignmentDate = Date.now()
  }

  // If marking as completed
  if (status === "completed") {
    request.completionDate = Date.now()
  }

  const updatedRequest = await request.save()

  res.json(updatedRequest)
})

module.exports = {
  createRequest,
  getRequests,
  getMyRequests,
  getRequestById,
  updateRequestStatus,
}

