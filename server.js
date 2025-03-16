const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

// Initialize Express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Logging middleware in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/requests", require("./routes/requestRoutes"))
app.use("/api/technicians", require("./routes/technicianRoutes"))

// Base route
app.get("/", (req, res) => {
  res.send("API is running...")
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

