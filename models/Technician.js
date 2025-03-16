const mongoose = require("mongoose")

const technicianSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    mobile: {
      type: String,
      required: [true, "Please add a mobile number"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
    },
    specialization: {
      type: String,
      required: [true, "Please add a specialization"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
)

const Technician = mongoose.model("Technician", technicianSchema)

module.exports = Technician

