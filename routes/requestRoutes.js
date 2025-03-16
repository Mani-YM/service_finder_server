const express = require("express")
const router = express.Router()
const {
  createRequest,
  getRequests,
  getMyRequests,
  getRequestById,
  updateRequestStatus,
} = require("../controllers/requestController")
const { protect, admin } = require("../middleware/authMiddleware")

// Protected routes
router.get("/myRequests", protect, getMyRequests)

// Public route for creating a request (can be done without login)
router.post("/", createRequest)



// Admin routes
router.get("/", protect, admin, getRequests)
router.put("/:id/status", protect, admin, updateRequestStatus)

// Public route for getting a request by ID
router.get("/:id", getRequestById)

module.exports = router

