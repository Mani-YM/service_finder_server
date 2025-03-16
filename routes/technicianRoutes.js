const express = require("express")
const router = express.Router()
const {
  getTechnicians,
  getTechnicianById,
  createTechnician,
  updateTechnician,
  deleteTechnician,
  getTechnicianStats,
} = require("../controllers/technicianController")
const { protect, admin } = require("../middleware/authMiddleware")

// Public routes
router.get("/", getTechnicians)
router.get("/:id", getTechnicianById)

// Admin routes
router.post("/", protect, admin, createTechnician)
router.put("/:id", protect, admin, updateTechnician)
router.delete("/:id", protect, admin, deleteTechnician)
router.get("/:id/stats", protect, admin, getTechnicianStats)

module.exports = router

